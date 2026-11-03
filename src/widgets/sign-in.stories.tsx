import type { Meta, StoryObj } from '@storybook/react-vite';
import { type FormEvent, useState } from 'react';

import { Button } from '../components/button/button';
import { Field, FieldError, FieldLabel } from '../components/field/field';
import { Input } from '../components/input/input';
import { Logo, LogoMark } from '../components/logo/logo';
import { Separator } from '../components/separator/separator';
import { Starfield } from '../components/starfield/starfield';
import { ThemeScope } from '../theme/theme-scope';
import { RefineIconArrowRightMD, RefineIconMail } from '../icons/refine-icons';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Widgets/Sign In Screen',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Renders a split sign-in screen: a starfield brand panel beside a magic-link form that validates the e-mail domain.
 */
const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const isEmailValid = /^[^@\s]+@refine\.studio$/.test(email);

  /**
   * Validates the e-mail and fakes sending the magic link when it belongs to refine.studio.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
    if (!isEmailValid) return;

    setIsSending(true);
    window.setTimeout(() => {
      setIsSending(false);
    }, 1500);
  };

  return (
    <div className="lg:grid-cols-2 grid min-h-svh bg-background">
      <ThemeScope
        className="lg:flex lg:flex-col lg:justify-between lg:p-12 relative hidden overflow-hidden"
        mode="dark"
      >
        <Starfield className="inset-0 absolute size-full" />
        <div className="inset-0 absolute bg-gem-radiance" />
        <Logo className="h-7 relative w-auto self-start" />
        <div className="gap-4 relative grid">
          <span className="eyebrow text-gem-ink">Internal · Diamonds only</span>
          <p className="max-w-md font-black font-display text-display-sm text-balance">
            Tools for the people who <span className="text-gem-gradient">make the product.</span>
          </p>
        </div>
      </ThemeScope>
      <main className="p-6 flex items-center justify-center">
        <form className="max-w-sm gap-6 grid w-full" noValidate onSubmit={handleSubmit}>
          <LogoMark className="h-6 lg:hidden w-auto self-start" />
          <header className="gap-2 grid">
            <h1 className="text-headline-lg">Sign in</h1>
            <p className="text-body text-muted-foreground">We send a one-time link to your refine.studio inbox.</p>
          </header>
          <Field invalid={hasSubmitted && !isEmailValid} required>
            <FieldLabel>Work e-mail</FieldLabel>
            <Input
              autoComplete="email"
              leading={<RefineIconMail />}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              placeholder="you@refine.studio"
              type="email"
              value={email}
            />
            <FieldError>{hasSubmitted && !isEmailValid ? 'Use your refine.studio address.' : null}</FieldError>
          </Field>
          <Button loading={isSending} size="lg" type="submit" variant="gem">
            Send magic link
            <RefineIconArrowRightMD />
          </Button>
          <Separator label="or" />
          <Button size="lg" variant="outline">
            Continue with Microsoft
          </Button>
        </form>
      </main>
    </div>
  );
};

export const SplitScreen: Story = {
  render: () => {
    return <SignInScreen />;
  },
};
