import Image from 'next/image';

interface Driver {
  driver_number: number;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
  headshot_url: string;
  country_code: string;
}

interface Position {
  date: string;
  driver_number: number;
  meeting_key: number;
  position: number;
  session_key: number;
}

interface Session {
  session_key: number;
  session_name: string;
  date_start: string;
  meeting_key: number;
  circuit_short_name: string;
  year: number;
}

interface DriverStanding {
  driver: Driver;
  points: number;
  wins: number;
  position: number;
}


const driverImageFallbacks: Record<string, string> = {
  'Franco Colapinto': 'https://media.formula1.com/image/upload/f_auto,c_limit,w_960,q_auto/content/dam/fom-website/drivers/2024Drivers/colapinto',
};

async function getStandings(): Promise<DriverStanding[]> {
  try {
  
    const sessionsRes = await fetch(
      'https://api.openf1.org/v1/sessions?year=2025&session_name=Race',
      { next: { revalidate: 3600 } }
    );
    const sessions: Session[] = await sessionsRes.json();

   
    const sortedSessions = sessions.sort((a, b) =>
      new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
    );

  
    if (sortedSessions.length === 0) {
      return [];
    }

    const latestSession = sortedSessions[sortedSessions.length - 1];
    const driversRes = await fetch(
      `https://api.openf1.org/v1/drivers?session_key=${latestSession.session_key}`,
      { next: { revalidate: 3600 } }
    );
    const allDrivers: Driver[] = await driversRes.json();

 
    const uniqueDrivers = allDrivers.reduce((acc: Driver[], current: Driver) => {
      const exists = acc.find(item => item.driver_number === current.driver_number);
      if (!exists) {
        return acc.concat([current]);
      }
      return acc;
    }, []);

  
    const pointsSystem = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]; 
    const driverPoints = new Map<number, { points: number; wins: number; driver: Driver }>();

  
    uniqueDrivers.forEach(driver => {
   
      if (!driver.headshot_url && driverImageFallbacks[driver.full_name]) {
        driver.headshot_url = driverImageFallbacks[driver.full_name];
      }
      driverPoints.set(driver.driver_number, { points: 0, wins: 0, driver });
    });

   
    for (const session of sortedSessions) {
      const positionsRes = await fetch(
        `https://api.openf1.org/v1/position?session_key=${session.session_key}`,
        { next: { revalidate: 3600 } }
      );
      const positionsJson = await positionsRes.json();

      // API might return an array or an object containing the array (e.g. { positions: [...] } or { data: [...] })
      const positionsData: Position[] = Array.isArray(positionsJson)
        ? positionsJson
        : positionsJson?.positions ?? positionsJson?.data ?? [];

      if (!Array.isArray(positionsData)) {
        console.warn('Unexpected positions response shape for session', session.session_key, positionsJson);
      }

     
      const finalPositions = new Map<number, number>();
      positionsData.forEach(pos => {
        const current = finalPositions.get(pos.driver_number);
        const mostRecentForDriver = positionsData.find(p => p.driver_number === pos.driver_number && finalPositions.get(pos.driver_number) === p.position);
        const mostRecentDate = mostRecentForDriver ? new Date(mostRecentForDriver.date).getTime() : 0;
        if (!current || new Date(pos.date).getTime() > mostRecentDate) {
          finalPositions.set(pos.driver_number, pos.position);
        }
      });

   
      finalPositions.forEach((position, driverNumber) => {
        const driverData = driverPoints.get(driverNumber);
        if (driverData && position >= 1 && position <= 10) {
          driverData.points += pointsSystem[position - 1];
          if (position === 1) {
            driverData.wins += 1;
          }
        }
      });
    }


    const standings: DriverStanding[] = Array.from(driverPoints.entries())
      .map(([, data]) => ({
        driver: data.driver,
        points: data.points,
        wins: data.wins,
        position: 0
      }))
      .sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.wins !== a.wins) return b.wins - a.wins;
        return a.driver.full_name.localeCompare(b.driver.full_name);
      })
      .map((standing, index) => ({
        ...standing,
        position: index + 1
      }));

    return standings;
  } catch (error) {
    console.error('Error fetching standings:', error);
    return [];
  }
}

export default async function StandingsPage() {
  const standings = await getStandings();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-f1-red">Kuljettajien</span> MM-sarjatilanne 2025
      </h1>

      {standings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Sarjatilannetta ei löytynyt.</p>
        </div>
      ) : (
        <div className="bg-dark-gray border border-light-gray rounded-lg overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-mid-gray border-b border-light-gray font-bold text-sm text-gray-400">
            <div className="col-span-1">Sija</div>
            <div className="col-span-6">Kuljettaja</div>
            <div className="col-span-2 text-center">Voitot</div>
            <div className="col-span-3 text-right">Pisteet</div>
          </div>

          {/* Rows */}
          {standings.map((standing, index) => (
            <div
              key={standing.driver.driver_number}
              className={`grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-light-gray hover:bg-mid-gray transition-colors ${
                index < 3 ? 'bg-dark-gray/50' : ''
              }`}
            >
              {/* Position */}
              <div className="col-span-1">
                <span
                  className={`text-2xl font-bold ${
                    standing.position === 1
                      ? 'text-f1-red'
                      : standing.position === 2
                      ? 'text-gray-300'
                      : standing.position === 3
                      ? 'text-amber-600'
                      : 'text-gray-500'
                  }`}
                >
                  {standing.position}
                </span>
              </div>

              {/* Driver info */}
              <div className="col-span-6 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-mid-gray flex-shrink-0 border-2 border-light-gray">
                  {standing.driver.headshot_url ? (
                    <Image
                      src={standing.driver.headshot_url}
                      alt={standing.driver.full_name}
                      fill
                      className="object-cover object-top scale-110"
                      unoptimized
                      quality={100}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-sm font-bold text-gray-600">
                      {standing.driver.name_acronym}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold truncate">
                      {standing.driver.full_name}
                    </span>
                    <span className="text-xs">{getFlagEmoji(standing.driver.country_code)}</span>
                  </div>
                  <div
                    className="text-xs font-medium mt-1 px-2 py-0.5 rounded inline-block"
                    style={{
                      backgroundColor: standing.driver.team_colour
                        ? `#${standing.driver.team_colour}`
                        : '#666',
                      color: '#fff'
                    }}
                  >
                    {standing.driver.team_name}
                  </div>
                </div>
              </div>

              {/* Wins */}
              <div className="col-span-2 text-center">
                <span className="text-white font-semibold">{standing.wins}</span>
              </div>

              {/* Points */}
              <div className="col-span-3 text-right">
                <span className="text-2xl font-bold text-f1-red">{standing.points}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-sm text-gray-500">
        <p>* Pisteet laskettu OpenF1 API:n position-datan perusteella</p>
        <p>* Pistejärjestelmä: 25-18-15-12-10-8-6-4-2-1 (TOP 10)</p>
      </div>
    </div>
  );
}

function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🏁';

  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}
