import { writable } from 'svelte/store';

export interface LanguagePack {
  code: 'en' | 'pt';
  metadata: {
    title: string;
    description: string;
  };
  projects: {
    links: {
      wip: string;
      deploy: string;
      code: string;
    };
  };
}

const EN: LanguagePack = {
  code: 'en',
  metadata: {
    title: 'Portfolio',
    description: 'Portfolio website featuring projects, skills, and experience.'
  },
  projects: {
    links: {
      wip: 'Work in progress',
      deploy: 'Demo',
      code: 'Code'
    }
  }
};

const PT: LanguagePack = {
  code: 'pt',
  metadata: {
    title: 'Portifolio',
    description: 'Site de portifolio com projetos, habilidades e experiência.'
  },
  projects: {
    links: {
      wip: 'Em desenvolvimento',
      deploy: 'Demo',
      code: 'Código'
    }
  }
};

const isBrowser = typeof window !== 'undefined';

const updateAria = (code: LanguagePack['code']) => {
  if (!isBrowser) return;
  document.documentElement.setAttribute('lang', code);
};

const defaultLang = (): LanguagePack => {
  if (!isBrowser) return EN;
  return window.navigator.language.toLowerCase().startsWith('pt') ? PT : EN;
};

export const initLang = () => {
  const start = defaultLang();
  const { subscribe, set } = writable<LanguagePack>(start);

  updateAria(start.code);

  return {
    subscribe,
    change: (lang: string) => {
      const selected = lang === 'pt' ? PT : EN;
      set(selected);
      updateAria(selected.code);
    }
  };
};

export const LANG = initLang();

