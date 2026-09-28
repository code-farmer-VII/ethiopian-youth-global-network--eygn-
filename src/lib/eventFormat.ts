import { EventDto } from './api';
import { EventItem } from '../types';

const TYPE_LABEL: Record<EventDto['type'], EventItem['type']> = {
  in_person: 'In-Person',
  hybrid: 'Hybrid',
  virtual: 'Virtual',
};

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

/**
 * Maps an API EventDto onto the frontend's EventItem shape so existing components (built
 * against the static UPCOMING_EVENTS/PAST_EVENTS data) don't need to change field names.
 * `id` is populated with the event's `slug` (see eygn-api's X2) -- EventRegistrationModal
 * already treats it as the registration identifier.
 *
 * Times are shown in the viewer's own local timezone (browser default), not a fixed
 * Ethiopia/EAT time -- deliberate for a global diaspora audience across many timezones.
 */
export function toEventItem(dto: EventDto): EventItem {
  const date = new Date(dto.startsAt).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const time = dto.endsAt ? `${formatTime(dto.startsAt)} - ${formatTime(dto.endsAt)}` : formatTime(dto.startsAt);

  return {
    id: dto.slug,
    title: dto.title,
    date,
    time,
    location: dto.location ?? 'Location to be announced',
    type: TYPE_LABEL[dto.type],
    category: dto.category ?? 'General',
    description: dto.description ?? '',
    featuredSpeakers: dto.featuredSpeakers,
    capacity: dto.capacity ?? 0,
    registeredCount: dto.registeredCount,
    status: dto.status,
  };
}
