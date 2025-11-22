import React from 'react'
import {
  ConfirmEmailFormData,
  FormDataToRecord,
  PartialFormData,
} from '@types/'
import { AuthForm } from './AuthForm'

interface ConfirmEmailFormProps {
  formData: ConfirmEmailFormData
  error: string
  isLoading: boolean
  pendingEmail: string
  onChange: (data: Partial<ConfirmEmailFormData>) => void
  onSubmit: (e: React.FormEvent) => void
  onSwitchToLogin: () => void
}

export const ConfirmEmailForm: React.FC<ConfirmEmailFormProps> = ({
  formData,
  error,
  isLoading,
  pendingEmail,
  onChange,
  onSubmit,
  onSwitchToLogin,
}) => {
  const fields = [
    {
      name: 'code',
      label: 'Код из e-mail',
      type: 'text',
      placeholder: 'Введите 6-значный код',
      required: true,
      maxLength: 6,
      transformValue: (value: string) => value.replace(/\D/g, '').slice(0, 6),
    },
  ]

  const footerContent = (
    <>
      <p>
        Не получили код?{' '}
        <button
          type="button"
          className="authLinkButton"
          onClick={() => console.log('Resend code')}
        >
          Отправить повторно
        </button>
      </p>
      <button
        type="button"
        className="authLinkButton"
        onClick={onSwitchToLogin}
      >
        Вернуться к входу
      </button>
    </>
  )

  const handleFormChange = (data: PartialFormData<ConfirmEmailFormData>) => {
    onChange(data as Partial<ConfirmEmailFormData>)
  }

  return (
    <>
      <AuthForm
        fields={fields}
        formData={formData as FormDataToRecord<ConfirmEmailFormData>}
        error={error}
        isLoading={isLoading}
        submitText="Подтвердить"
        loadingText="Подтверждение..."
        footerContent={footerContent}
        onChange={handleFormChange}
        onSubmit={onSubmit}
      />

      {pendingEmail && (
        <div className="authEmailNotice">
          Код отправлен на: <strong>{pendingEmail}</strong>
          <br />
          <small>
            Для демо используйте код: <strong>123456</strong>
          </small>
        </div>
      )}
    </>
  )
}
