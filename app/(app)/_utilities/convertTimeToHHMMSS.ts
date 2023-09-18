/**
 * Convert time from milliseconds to HH:MM:SS format.
 *
 * @param timeInMilliseconds - The time in milliseconds.
 *
 * @returns The time in HH:MM:SS format.
 */
export default function convertTimeToHHMMSS(timeInMilliseconds: number): string {
    const totalSeconds = Math.floor(timeInMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
