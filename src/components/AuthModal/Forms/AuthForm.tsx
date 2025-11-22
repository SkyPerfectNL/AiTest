import React from 'react'
import { FormDataToRecord } from '@types/'

interface FormField {
  name: string
  label: string
  type: string
  placeholder?: string
  required?: boolean
  maxLength?: number
  transformValue?: (value: string) => string
}

interface AuthFormProps<T> {
  fields: FormField[]
  formData: FormDataToRecord<T>
  error: string
  isLoading: boolean
  submitText: string
  loadingText: string
  footerContent: React.ReactNode
  onChange: (data: Partial<FormDataToRecord<T>>) => void
  onSubmit: (e: React.FormEvent) => void
}

export function AuthForm<T extends Record<string, unknown>>({
  fields,
  formData,
  error,
  isLoading,
  submitText,
  loadingText,
  footerContent,
  onChange,
  onSubmit,
}: AuthFormProps<T>): React.ReactElement {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const fieldConfig = fields.find((field) => field.name === name)

    const transformedValue = fieldConfig?.transformValue
      ? fieldConfig.transformValue(value)
      : value

    onChange({ [name]: transformedValue } as Partial<FormDataToRecord<T>>)
  }

  return (
    <>
      <form onSubmit={onSubmit} className="authForm">
        {fields.map((field) => (
          <div key={field.name} className="authFormGroup">
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name as keyof FormDataToRecord<T>] || ''}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              required={field.required}
              disabled={isLoading}
              maxLength={field.maxLength}
            />
          </div>
        ))}

        {error && <div className="authErrorMessage">{error}</div>}

        <button type="submit" className="authSubmitButton" disabled={isLoading}>
          {isLoading ? loadingText : submitText}
        </button>
      </form>

      <div className="authModalFooter">{footerContent}</div>
    </>
  )
}
