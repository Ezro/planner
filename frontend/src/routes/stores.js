import { writable } from 'svelte/store';
export const Page = {
    Weeks: 'Weeks',
    Week: 'Week'
};
export const serverUrl = writable('http://127.0.0.1:5000');
export const currentPage = writable(Page.Weeks);
export const selectedYear = writable('');
export const selectedWeek = writable('');
export const navbarTitle = writable('Current');
export const isSidebarOpen = writable(false);
export const weeksData = writable({});
export const weekData = writable({});
export const prevYear = writable('');
export const prevWeek = writable('');