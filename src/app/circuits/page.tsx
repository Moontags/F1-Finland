'use client';

import { useState, useEffect } from 'react';

interface Meeting {
  circuit_key: number;
  circuit_short_name: string;
  country_code: string;
  country_key: number;
  country_name: string;
  date_start: string;
  gmt_offset: string;
  location: string;
  meeting_key: number;
  meeting_name: string;
  meeting_official_name: string;
  year: number;
}

async function getMeetings() {
  try {
    const res = await fetch('https://api.openf1.org/v1/meetings?year=2025', {
      next: { revalidate: 3600 }
    });
    const meetings: Meeting[] = await res.json();

    const uniqueMeetings = meetings.reduce((acc: Meeting[], current: Meeting) => {
      const exists = acc.find(item => item.circuit_key === current.circuit_key);
      if (!exists) {
        return acc.concat([current]);
      }
      return acc;
    }, []);

    return uniqueMeetings.sort((a, b) =>
      new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
    );
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return [];
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fi-FI', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🏁';

  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}

export default function CircuitsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMeetings().then(data => {
      setMeetings(data);
      setLoading(false);
    });
  }, []);

  // Näytä 6 ensimmäistä tai kaikki riippuen showAll-tilasta
  const displayedMeetings = showAll ? meetings : meetings.slice(0, 6);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <p className="text-gray-400">Ladataan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-f1-red">F1</span> Radat 2025
      </h1>

      {meetings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Ratoja ei löytynyt.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedMeetings.map((meeting) => (
              <div
                key={meeting.meeting_key}
                className="bg-dark-gray border border-light-gray rounded-lg p-6 hover:border-f1-red transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white mb-2">
                      {meeting.circuit_short_name}
                    </h2>
                    <p className="text-sm text-gray-400 mb-1">
                      {meeting.location}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getFlagEmoji(meeting.country_code)}</span>
                      <span className="text-sm text-gray-300">{meeting.country_name}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-light-gray pt-4 mt-4">
                  <h3 className="text-sm font-semibold text-f1-red mb-2">
                    {meeting.meeting_name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {formatDate(meeting.date_start)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {meetings.length > 6 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-f1-red text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                {showAll ? 'Näytä vähemmän' : `Näytä kaikki (${meetings.length} rataa)`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}