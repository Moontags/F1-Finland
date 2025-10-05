import Image from 'next/image';

interface Driver {
  session_key: number;
  meeting_key: number;
  broadcast_name: string;
  country_code: string;
  first_name: string;
  full_name: string;
  headshot_url: string;
  last_name: string;
  driver_number: number;
  team_colour: string;
  team_name: string;
  name_acronym: string;
}

// 🧩 Fallback-kuvat – lisätään myöhemmin täydellinen lista 2025 kuskeista
const driverImageFallbacks: Record<string, string> = {
  'Franco Colapinto':
    'https://media.formula1.com/image/upload/f_auto,c_limit,w_960,q_auto/content/dam/fom-website/drivers/2024Drivers/colapinto',
};

async function getDrivers() {
  try {
    // 🔹 Hae viimeisin kauden 2025 sessio
    const sessionsRes = await fetch('https://api.openf1.org/v1/sessions?year=2025', {
      next: { revalidate: 3600 }, // Cache 1h
    });
    const sessions = await sessionsRes.json();
    const latestSession = sessions[sessions.length - 1];

    if (!latestSession) return [];


    const driversRes = await fetch(
      `https://api.openf1.org/v1/drivers?session_key=${latestSession.session_key}`,
      { next: { revalidate: 3600 } }
    );
    const drivers: Driver[] = await driversRes.json();

    
    const uniqueDrivers = drivers.reduce((acc: Driver[], current: Driver) => {
      const exists = acc.find((item) => item.driver_number === current.driver_number);
      if (!exists) {
        if (!current.headshot_url && driverImageFallbacks[current.full_name]) {
          current.headshot_url = driverImageFallbacks[current.full_name];
        }
        return acc.concat([current]);
      }
      return acc;
    }, []);

    return uniqueDrivers.sort((a, b) => a.driver_number - b.driver_number);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    return [];
  }
}

export default async function DriversPage() {
  const drivers = await getDrivers();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-f1-red">F1</span> Kuljettajat 2025
      </h1>

      {drivers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Kuljettajia ei löytynyt.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {drivers.map((driver) => (
            <div
              key={driver.driver_number}
              className="bg-dark-gray border border-light-gray rounded-2xl overflow-hidden hover:border-f1-red transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <div className="relative h-80 bg-mid-gray flex items-center justify-center">
                {driver.headshot_url ? (
                  <Image
                    src={
                      driver.headshot_url ||
                      driverImageFallbacks[driver.full_name] ||
                      '/images/default-driver.png'
                    }
                    alt={driver.full_name}
                    width={400}
                    height={400}
                    className="rounded-2xl object-cover object-top w-full h-full transition-transform duration-300 hover:scale-105"
                    quality={95}
                    priority
                    unoptimized={false}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-6xl font-bold text-gray-600">
                    {driver.name_acronym}
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold text-f1-red">
                    {driver.driver_number}
                  </span>
                  <span className="text-sm text-gray-400">{driver.country_code}</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{driver.full_name}</h2>
                <div
                  className="text-sm font-medium mt-2 px-2 py-1 rounded inline-block"
                  style={{
                    backgroundColor: driver.team_colour ? `#${driver.team_colour}` : '#666',
                    color: '#fff',
                  }}
                >
                  {driver.team_name}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
