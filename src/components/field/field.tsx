'use client';

import { Label as LabelPrimitive } from 'radix-ui';
import { type ComponentProps, createContext, use, useEffect, useId, useState } from 'react';

import { cn } from '../../lib/cn';

interface FieldContextValue {
  controlId: string;
  descriptionId: string;
  disabled: boolean;
  errorId: string;
  hasDescription: boolean;
  hasError: boolean;
  invalid: boolean;
  labelId: string;
  required: boolean;
  setHasDescription: (hasDescription: boolean) => void;
  setHasError: (hasError: boolean) => void;
}

const FieldContext = createContext<FieldContextValue | null>(null);

interface FieldProps extends ComponentProps<'div'> {
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
}

/**
 * Groups a label, a control, a description and an error, and wires their ids and ARIA state together through context.
 */
export const Field = ({ className, disabled = false, invalid = false, required = false, ...props }: FieldProps) => {
  const id = useId();
  const [hasDescription, setHasDescription] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <FieldContext
      value={{
        controlId: `${id}-control`,
        descriptionId: `${id}-description`,
        disabled,
        errorId: `${id}-error`,
        hasDescription,
        hasError,
        invalid: invalid || hasError,
        labelId: `${id}-label`,
        required,
        setHasDescription,
        setHasError,
      }}
    >
      <div
        className={cn('group/field flex flex-col gap-1.5', className)}
        data-disabled={disabled || undefined}
        data-invalid={invalid || hasError || undefined}
        data-slot="field"
        {...props}
      />
    </FieldContext>
  );
};

/**
 * Returns the surrounding field's state, or null outside a `Field`.
 */
export const useField = () => {
  return use(FieldContext);
};

interface FieldControlProps {
  'aria-describedby'?: string;
  'aria-errormessage'?: string;
  'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling';
  disabled?: boolean;
  id?: string;
  required?: boolean;
}

/**
 * Merges a control's own props with the surrounding field's id, description, error and disabled state; explicit props win.
 */
export const useFieldControl = <TProps extends FieldControlProps>(props: TProps) => {
  const field = useField();
  if (!field) return props;

  const describedBy = [
    props['aria-describedby'],
    field.hasDescription ? field.descriptionId : undefined,
    field.hasError ? field.errorId : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  return {
    ...props,
    'aria-describedby': describedBy || undefined,
    'aria-errormessage': props['aria-errormessage'] ?? (field.hasError ? field.errorId : undefined),
    'aria-invalid': props['aria-invalid'] ?? (field.invalid || undefined),
    disabled: props.disabled ?? (field.disabled || undefined),
    id: props.id ?? field.controlId,
    required: props.required ?? (field.required || undefined),
  };
};

interface FieldLabelProps extends ComponentProps<typeof LabelPrimitive.Root> {
  optional?: boolean;
}

/**
 * Labels the field's control and marks it as required or optional.
 */
export const FieldLabel = ({ children, className, optional = false, ...props }: FieldLabelProps) => {
  const field = useField();

  return (
    <LabelPrimitive.Root
      className={cn(
        'inline-flex items-center gap-1 text-body-sm font-medium text-foreground select-none',
        'group-data-disabled/field:opacity-50',
        className,
      )}
      data-slot="field-label"
      htmlFor={field?.controlId}
      id={field?.labelId}
      {...props}
    >
      {children}
      {field?.required && (
        <span aria-hidden className="text-danger-ink" role="presentation">
          *
        </span>
      )}
      {optional && <span className="font-normal text-muted-foreground">(optional)</span>}
    </LabelPrimitive.Root>
  );
};

/**
 * Registers a piece of field state on mount and clears it on unmount.
 */
const useRegister = (register: ((isPresent: boolean) => void) | undefined, isPresent: boolean) => {
  useEffect(() => {
    if (!register) return;
    register(isPresent);

    return () => {
      register(false);
    };
  }, [register, isPresent]);
};

/**
 * Adds help text under the control and links it through `aria-describedby`.
 */
export const FieldDescription = ({ className, ...props }: ComponentProps<'p'>) => {
  const field = useField();
  useRegister(field?.setHasDescription, true);

  return (
    <p
      className={cn('text-body-sm text-muted-foreground', className)}
      data-slot="field-description"
      id={field?.descriptionId}
      {...props}
    />
  );
};

/**
 * Shows the validation message, marks the field invalid and links the message through `aria-errormessage`; renders nothing when empty.
 */
export const FieldError = ({ children, className, ...props }: ComponentProps<'p'>) => {
  const field = useField();
  const hasMessage = Boolean(children);
  useRegister(field?.setHasError, hasMessage);

  if (!hasMessage) return null;

  return (
    <p
      className={cn('text-body-sm font-medium text-danger-ink', className)}
      data-slot="field-error"
      id={field?.errorId}
      role="alert"
      {...props}
    >
      {children}
    </p>
  );
};
