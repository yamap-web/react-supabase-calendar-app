import { supabase } from './supabase';

export const fetchEventList = async () => {
  const events = await supabase.from('calendar_events').select('*');
  return events.data;
};

export const addEventData = async (
  title: string,
  startDateTime: string,
  endDateTime: string
) => {
  await supabase.from('calendar_events').insert({
    title: title,
    start_datetime: startDateTime,
    end_datetime: endDateTime,
  });
};

export const deleteEventData = async (id: number | null) => {
  await supabase.from('calendar_events').delete().eq('id', id);
};

export const editEventData = async (
  id: number | null,
  title: string,
  startDateTime: string,
  endDateTime: string
) => {
  await supabase
    .from('calendar_events')
    .update({
      title: title,
      start_datetime: startDateTime,
      end_datetime: endDateTime,
    })
    .eq('id', id);
};
