import { useEffect } from 'react';
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events';
import { addons } from 'storybook/preview-api';

import { applyTheme, type ThemeSettings } from '../../theme/theme';

interface PreviewWindow {
  __STORYBOOK_PREVIEW__?: {
    storyStoreValue?: {
      userGlobals?: {
        get: () => Partial<ThemeSettings>;
      };
    };
  };
}

interface GlobalsEvent {
  globals: Partial<ThemeSettings>;
}

/**
 * Mirrors the toolbar theme onto `<html>` on MDX pages, where story decorators never run.
 */
export const useDocsTheme = () => {
  useEffect(() => {
    const preview = (window as PreviewWindow).__STORYBOOK_PREVIEW__;
    const initialGlobals = preview?.storyStoreValue?.userGlobals?.get();
    if (initialGlobals) applyTheme(document.documentElement, initialGlobals);

    const channel = addons.getChannel();
    const handleGlobals = ({ globals }: GlobalsEvent) => {
      applyTheme(document.documentElement, globals);
    };
    channel.on(GLOBALS_UPDATED, handleGlobals);
    channel.on(SET_GLOBALS, handleGlobals);

    return () => {
      channel.off(GLOBALS_UPDATED, handleGlobals);
      channel.off(SET_GLOBALS, handleGlobals);
    };
  }, []);
};
