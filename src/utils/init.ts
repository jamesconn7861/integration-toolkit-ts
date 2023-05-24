import { useStore } from '@/stores/store';
import type { AppSettings } from '@/types';

async function initApp() {
  const cachedDataRoute = import.meta.env.VITE_API_CACHED_ROUTE;

  while (!localStorage.getItem('user')) {
    verifyUsername(
      prompt(
        'Enter your pomeroy username. This is will be the first character of your first name and you entire last name.'
      )
    );
  }

  useStore().addHook('theme', updateTheme);

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    useStore().updateSetting('theme', savedTheme)
  }

  const savedSettings = {
    ...localStorage,
  };
  useStore().updateSettings({ ...defaultSettings, ...savedSettings });

  try {
    const res = await useStore().axiosInst.get(cachedDataRoute);
    useStore().updateSchemas(
      res.data['vlanSchema'],
      res.data['switchSchema'],
      res.data['tableSchema']
    );
    console.log('Schemas updated');
  } catch (err) {
    useStore().showPermMsg({
      msg: 'An error occured while connecting to the server.',
      status: 'error',
    });
  }
}

function verifyUsername(username: string | null) {
  if (!username || username.length < 2 || /\d/.test(username)) {
    alert('Invalid username.');
    return;
  }

  localStorage.setItem('user', username);
  useStore().updateSetting('user', username);
}

function updateTheme(theme: string) {
  document.documentElement.setAttribute('data-theme', theme.toLowerCase());
  localStorage.setItem('theme', theme);
}

const defaultSettings: AppSettings = {
  user: '',
  theme: '',
  showCellCount: true,
  highlightDuplicates: {
    activeColumn: 0,
  },
};

export { initApp };
