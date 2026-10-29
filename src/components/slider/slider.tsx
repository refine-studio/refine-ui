'use client';

import { Slider as SliderPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/cn';
import { useField, useFieldControl } from '../field/field';

interface SliderProps extends ComponentProps<typeof SliderPrimitive.Root> {
  thumbLabelIds?: string[];
}

/**
 * Picks one value, or a range when given two values, along a gem-filled track; `thumbLabelIds` name each thumb through `aria-labelledby`.
 */
export const Slider = ({ className, defaultValue, max = 100, min = 0, thumbLabelIds, value, ...props }: SliderProps) => {
  const field = useField();
  const { id, ...controlProps } = useFieldControl(props);
  const thumbCount = (value ?? defaultValue ?? [min]).length;

  return (
    <SliderPrimitive.Root
      className={cn(
        'relative flex w-full touch-none items-center select-none data-disabled:opacity-45',
        'data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        className,
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      max={max}
      min={min}
      value={value}
      {...controlProps}
    >
      <SliderPrimitive.Track className="relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5">
        <SliderPrimitive.Range className="absolute bg-gem-gradient data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
      </SliderPrimitive.Track>
      {Array.from(
        {
          length: thumbCount,
        },
        (_, index) => {
          return (
            <SliderPrimitive.Thumb
              aria-labelledby={thumbLabelIds?.[index] ?? (thumbCount === 1 ? field?.labelId : undefined)}
              className={cn(
                // base
                'block size-4.5 rounded-full border-2 border-gem bg-background shadow-float',
                'transition-[transform,box-shadow] duration-150 ease-spring',
                'focus-ring',
                // hover
                'hover:scale-110 hover:shadow-glow',
                // active
                'active:scale-95',
                // disabled
                'data-disabled:pointer-events-none',
              )}
              id={index === 0 ? id : undefined}
              key={index}
            />
          );
        },
      )}
    </SliderPrimitive.Root>
  );
};
