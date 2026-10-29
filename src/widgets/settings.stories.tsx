import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from '../components/avatar/avatar';
import { Badge } from '../components/badge/badge';
import { Button } from '../components/button/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/card/card';
import { Field, FieldDescription, FieldLabel } from '../components/field/field';
import { Input } from '../components/input/input';
import { PageHeader } from '../components/page-header/page-header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/select/select';
import { Separator } from '../components/separator/separator';
import { Switch } from '../components/switch/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/tabs/tabs';
import { ThemeSwitcher } from '../components/theme-switcher/theme-switcher';
import { ThemeProvider } from '../theme/theme-provider';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Widgets/Settings Screen',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const NOTIFICATIONS = [
  {
    description: 'When a deploy you started finishes or fails.',
    id: 'deploys',
    label: 'Deploy results',
  },
  {
    description: 'A nudge at 17:00 if today has fewer than eight hours.',
    id: 'timesheet',
    label: 'Timesheet reminder',
  },
  {
    description: 'Mentions in Tick comments and review threads.',
    id: 'mentions',
    label: 'Mentions',
  },
];

/**
 * Renders a single labelled switch row with its description, used by the notifications card.
 */
const SettingsNotificationRow = ({ description, id, label }: (typeof NOTIFICATIONS)[number]) => {
  return (
    <div className="gap-6 py-4 flex items-start justify-between">
      <div className="gap-1 grid">
        <label className="font-medium text-body" htmlFor={id}>
          {label}
        </label>
        <p className="text-body-sm text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={id !== 'mentions'} id={id} />
    </div>
  );
};

/**
 * Renders a tabbed settings page with profile, appearance and notification cards.
 */
const SettingsScreen = () => {
  return (
    <ThemeProvider storageKey={false}>
      <div className="max-w-4xl gap-8 p-6 md:p-10 mx-auto grid">
        <Tabs defaultValue="profile">
          <PageHeader
            description="How you show up in Tick and the ops console."
            eyebrow="Account"
            number={4}
            tabs={
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger count={3} value="notifications">
                  Notifications
                </TabsTrigger>
              </TabsList>
            }
            title="Settings"
          />
          <TabsContent className="pt-8" value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Visible to every Diamond.</CardDescription>
              </CardHeader>
              <CardContent className="gap-6 grid">
                <div className="gap-4 flex items-center">
                  <Avatar fallback="EV" size="lg" />
                  <Button size="sm" variant="outline">
                    Change photo
                  </Button>
                </div>
                <div className="gap-6 md:grid-cols-2 grid">
                  <Field>
                    <FieldLabel>Display name</FieldLabel>
                    <Input defaultValue="Elena" />
                  </Field>
                  <Field>
                    <FieldLabel>Role</FieldLabel>
                    <Select defaultValue="design">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="backend">Backend</SelectItem>
                        <SelectItem value="ops">Ops</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <Field>
                  <FieldLabel>Slack handle</FieldLabel>
                  <Input defaultValue="elena" leading="@" />
                  <FieldDescription>Tick posts your weekly summary here.</FieldDescription>
                </Field>
              </CardContent>
              <CardFooter className="gap-2 justify-end">
                <Button variant="ghost">Discard</Button>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent className="pt-8" value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Pick a mode and a gem. It applies to every Refine UI tool you open.</CardDescription>
              </CardHeader>
              <CardContent>
                <ThemeSwitcher />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent className="pt-8" value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="gap-2 flex items-center">
                  Notifications <Badge variant="gem">2 on</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {NOTIFICATIONS.map((notification, index) => {
                  return (
                    <div key={notification.id}>
                      {index > 0 && <Separator />}
                      <SettingsNotificationRow {...notification} />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ThemeProvider>
  );
};

export const Account: Story = {
  render: () => {
    return <SettingsScreen />;
  },
};
