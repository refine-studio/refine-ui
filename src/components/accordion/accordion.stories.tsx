import type { Meta, StoryObj } from '@storybook/react-vite';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

const meta = {
  component: Accordion,
  title: 'Components/Accordion',
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

const QUESTIONS = [
  {
    answer: 'Refine UI is for internal tools built by the Diamonds. Each customer product keeps its own design system.',
    question: 'When do I use Refine UI instead of a product’s own design system?',
  },
  {
    answer:
      'Wrap it in ThemeScope with mode="dark", "light" or "on-gem". The rest of the page keeps the document theme.',
    question: 'Can I switch one part of the screen to dark mode?',
  },
  {
    answer: 'Install @refine-studio/ui from GitHub Packages and import its stylesheet after Tailwind.',
    question: 'How do I add it to a new tool?',
  },
] as const;

export const Single: Story = {
  args: {
    collapsible: true,
    defaultValue: QUESTIONS[0].question,
    type: 'single',
  },
  render: (args) => {
    return (
      <Accordion {...args} className="w-[32rem]">
        {QUESTIONS.map(({ answer, question }) => {
          return (
            <AccordionItem key={question} value={question}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  },
};

export const Multiple: Story = {
  args: {
    defaultValue: [QUESTIONS[0].question, QUESTIONS[1].question],
    type: 'multiple',
  },
  render: Single.render,
};
