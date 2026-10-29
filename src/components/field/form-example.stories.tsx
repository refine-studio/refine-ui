import type { Meta, StoryObj } from '@storybook/react-vite';
import { Globe, Mail } from 'lucide-react';
import { type FormEvent, useState } from 'react';

import { Button } from '../button/button';
import { Checkbox } from '../checkbox/checkbox';
import { Input } from '../input/input';
import { Label } from '../label/label';
import { RadioGroup, RadioGroupItem } from '../radio-group/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select/select';
import { Slider } from '../slider/slider';
import { Switch } from '../switch/switch';
import { Textarea } from '../textarea/textarea';
import { ToggleGroup, ToggleGroupItem } from '../toggle-group/toggle-group';
import { Field, FieldDescription, FieldError, FieldLabel } from './field';

const meta = {
  parameters: {
    layout: 'padded',
  },
  title: 'Widgets/Tenant Form',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Composes every form control into the "New customer tenant" form, with validation on submit.
 */
const NewTenantForm = () => {
  const [slug, setSlug] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const slugError =
    hasSubmitted && !/^[a-z0-9-]{3,}$/.test(slug) ? 'Use at least three lowercase letters, digits or dashes.' : '';

  /**
   * Validates the form and fakes a short save when it passes.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
    if (!/^[a-z0-9-]{3,}$/.test(slug)) return;

    setIsSaving(true);
    window.setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  return (
    <form className="max-w-2xl gap-8 p-8 mx-auto grid card-surface" noValidate onSubmit={handleSubmit}>
      <header className="gap-2 grid">
        <span className="eyebrow text-gem-ink">01 — Onboarding</span>
        <h2 className="text-headline-lg">New customer tenant</h2>
        <p className="text-body text-muted-foreground">
          Generates the frontend, backend and gitops config for a Pilot tenant.
        </p>
      </header>

      <div className="gap-5 sm:grid-cols-2 grid">
        <Field required>
          <FieldLabel>Customer name</FieldLabel>
          <Input placeholder="Vela Windows GmbH" />
        </Field>
        <Field required>
          <FieldLabel>Tenant slug</FieldLabel>
          <Input
            leading={<Globe />}
            onChange={(event) => {
              setSlug(event.target.value);
            }}
            placeholder="vela"
            trailing=".pilot.example.com"
            value={slug}
          />
          <FieldError>{slugError}</FieldError>
        </Field>
        <Field>
          <FieldLabel>Industry</FieldLabel>
          <Select defaultValue="manufacturing">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="automotive">Automotive</SelectItem>
              <SelectItem value="banking">Banking</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel>Support e-mail</FieldLabel>
          <Input leading={<Mail />} placeholder="support@vela.example" type="email" />
          <FieldDescription>Members reach this from the help page.</FieldDescription>
        </Field>
      </div>

      <Field>
        <FieldLabel>Plan</FieldLabel>
        <RadioGroup className="gap-3 sm:grid-cols-3 grid" defaultValue="individual">
          {['Standalone', 'Individual', 'Enterprise'].map((plan) => {
            return (
              <Label
                className="gap-3 p-3 flex cursor-pointer items-center rounded-control border has-data-[state=checked]:border-gem has-data-[state=checked]:bg-gem-soft"
                htmlFor={`plan-${plan}`}
                key={plan}
              >
                <RadioGroupItem id={`plan-${plan}`} value={plan.toLowerCase()} />
                {plan}
              </Label>
            );
          })}
        </RadioGroup>
      </Field>

      <div className="gap-5 sm:grid-cols-2 grid">
        <Field>
          <FieldLabel>Points expiry</FieldLabel>
          <ToggleGroup defaultValue="12" type="single">
            <ToggleGroupItem value="6">6 months</ToggleGroupItem>
            <ToggleGroupItem value="12">12 months</ToggleGroupItem>
            <ToggleGroupItem value="never">Never</ToggleGroupItem>
          </ToggleGroup>
        </Field>
        <Field>
          <FieldLabel>Initial rollout</FieldLabel>
          <Slider defaultValue={[20]} step={10} />
          <FieldDescription>Share of members invited in the first wave.</FieldDescription>
        </Field>
      </div>

      <Field>
        <FieldLabel optional>Notes for the team</FieldLabel>
        <Textarea placeholder="Anything the Diamonds on the account should know." />
      </Field>

      <div className="gap-3 p-4 grid rounded-card bg-muted">
        <div className="gap-4 flex items-center justify-between">
          <Label htmlFor="tenant-sso">Single sign-on via Azure AD</Label>
          <Switch id="tenant-sso" />
        </div>
        <div className="gap-2 flex items-center">
          <Checkbox defaultChecked id="tenant-announce" />
          <Label htmlFor="tenant-announce">Announce the new tenant in #customers</Label>
        </div>
      </div>

      <footer className="gap-3 pt-6 flex flex-wrap justify-end border-t">
        <Button type="reset" variant="ghost">
          Cancel
        </Button>
        <Button loading={isSaving} type="submit" variant="gem">
          Create tenant
        </Button>
      </footer>
    </form>
  );
};

export const NewCustomerTenant: Story = {
  render: () => {
    return <NewTenantForm />;
  },
};
