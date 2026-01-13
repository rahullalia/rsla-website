import type { Metadata } from 'next';
import BookingConfirmedContent from './BookingConfirmedContent';

export const metadata: Metadata = {
  title: 'Booking Confirmed | RSL/A',
  description: 'Your call has been booked.',
  robots: 'noindex, nofollow',
};

export default function BookingConfirmedPage() {
  return <BookingConfirmedContent />;
}
