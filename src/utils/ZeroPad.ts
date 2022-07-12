export default function zeroPad(value: number, length: number): string {
    return String(value).padStart(length, '0');
}