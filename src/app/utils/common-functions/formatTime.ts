export default function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Pad minutes and seconds with leading zeros if needed
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = remainingSeconds.toString().padStart(2, '0');

    return `${minutesStr}:${secondsStr}`;
}