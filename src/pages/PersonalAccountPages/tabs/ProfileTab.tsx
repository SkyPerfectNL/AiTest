import { useAuth } from '@contexts/'
import { User } from '@types/'
import type React from 'react'
import { useForm, Controller, Control, FieldError } from 'react-hook-form'
import styles from '../styles/ProfileTab.module.scss'

const statusMap = {
  active: 'Активен',
  blocked: 'Заблокирован',
  deleted: 'Удалён',
}

export const ProfileTab: React.FC = () => {
  const { user, updateUser, openAuthModal } = useAuth()
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<User>({ defaultValues: user })

  const company = watch('company')
  const email = watch('email')
  const phone = watch('phone')

  const handleSave = (data: User) => {
    if (!data.company) {
      data.employeeCount = null
      data.jobPosition = null
      data.company = null
    }
    !data.fatherName && data.fatherName == null
    if (user?.email !== data.email) {
      data.emailConfirmed == false
    }
    if (user?.phone !== data.phone) {
      data.phoneConfirmed = false
    }
    console.log(data)
    updateUser(data)
  }

  const handleConfirmEmail = () => {
    console.log('Confirm email')
    openAuthModal('confirmEmail', email)
  }

  const handleConfirmPhone = () => {
    console.log('Confirm phone')
    openAuthModal('confirmPhone', phone)
  }

  return (
    <div className={styles.profileTab}>
      <form onSubmit={handleSubmit(handleSave)} className={styles.form}>
        <div className={styles.editableSection}>
          <label className={styles.label}>Статус</label>
          <div className={styles.displayValue}>{statusMap[user?.status]}</div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Имя пользователя</label>
            <Controller
              name="username"
              control={control}
              rules={{ required: 'введите имя пользователя' }}
              render={({ field }) => (
                <input {...field} className={styles.input} type="text" />
              )}
            />
            {errors.username && (
              <span className={styles.error}>{errors.username.message}</span>
            )}
          </div>

          <div className={styles.nameRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Имя</label>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'Введите ваше имя' }}
                render={({ field }) => (
                  <input {...field} className={styles.input} type="text" />
                )}
              />
              {errors.firstName && (
                <span className={styles.error}>{errors.firstName.message}</span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Фамилия</label>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Введите вашу фимилию' }}
                render={({ field }) => (
                  <input {...field} className={styles.input} type="text" />
                )}
              />
              {errors.lastName && (
                <span className={styles.error}>{errors.lastName.message}</span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Отчество</label>
              <Controller
                name="fatherName"
                control={control}
                render={({ field }) => (
                  <input {...field} className={styles.input} type="text" />
                )}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Почта
              {!user?.emailConfirmed && (
                <button
                  type="button"
                  onClick={handleConfirmEmail}
                  className={styles.confirmButton}
                >
                  Подтвердить
                </button>
              )}
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Введите вашу почту',
                // pattern: {
                //   value: /^\S+@\S+$/i,
                //   message: 'Некорректный формат!',
                // },
              }}
              render={({ field }) => (
                <input {...field} className={styles.input} type="email" />
              )}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Номер телефона
              {!user?.phoneConfirmed && (
                <button
                  type="button"
                  onClick={handleConfirmPhone}
                  className={styles.confirmButton}
                >
                  Подтвердить
                </button>
              )}
            </label>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: 'Введите номер телефона',
                pattern: {
                  value: /^(\+7\d{10}|8\d{10})$/,
                  message: 'Некорректный формат!',
                },
              }}
              render={({ field }) => (
                <input {...field} className={styles.input} type="tel" />
              )}
            />
            {errors.phone && (
              <span className={styles.error}>{errors.phone.message}</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Страна</label>
            <Controller
              name="country"
              control={control}
              rules={{ required: 'Введите страну' }}
              render={({ field }) => (
                <input {...field} className={styles.input} type="text" />
              )}
            />
            {errors.country && (
              <span className={styles.error}>{errors.country.message}</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Город</label>
            <Controller
              name="city"
              control={control}
              rules={{ required: 'Введите город' }}
              render={({ field }) => (
                <input {...field} className={styles.input} type="text" />
              )}
            />
            {errors.city && (
              <span className={styles.error}>{errors.city.message}</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Компания</label>
            <Controller
              name="company"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className={styles.input}
                  type="text"
                  value={field.value || ''}
                  placeholder="Нет"
                />
              )}
            />
          </div>

          {company && (
            <>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Количество работников</label>
                <Controller
                  name="employeeCount"
                  control={control}
                  rules={
                    company !== ''
                      ? { required: 'Пожалуйста, выберите один из вариантов' }
                      : undefined
                  }
                  render={({ field }) => (
                    <select
                      {...field}
                      className={styles.select}
                      value={field.value || '<10'}
                    >
                      <option value="<10">менее 10</option>
                      <option value="11-30">от 11 до 30</option>
                      <option value="30-100">от 30 до 100</option>
                      <option value=">100">более 100</option>
                    </select>
                  )}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Должность</label>
                <Controller
                  name="jobPosition"
                  control={control}
                  rules={
                    company !== ''
                      ? { required: 'Пожалуйста, ведите вашу должность' }
                      : undefined
                  }
                  render={({ field }) => (
                    <input
                      {...field}
                      className={styles.input}
                      type="text"
                      value={field.value || ''}
                    />
                  )}
                />
              </div>
            </>
          )}

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Цель использования</label>
            <Controller
              name="usePurpose"
              control={control}
              rules={{ required: 'Пожалуйста, выберите один из вариантов' }}
              render={({ field }) => (
                <select {...field} className={styles.select}>
                  <option value="personal">Личное использование</option>
                  <option value="testPersonal">
                    Тестирование собстенных разработок
                  </option>
                  <option value="testCompany">
                    Тестирование разработок компании
                  </option>
                  <option value="testJob">
                    Тестирование чужих разработок по договору
                  </option>
                </select>
              )}
            />
            {errors.usePurpose && (
              <span className={styles.error}>{errors.usePurpose.message}</span>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        <div className={styles.teamsSection}>
          <h3 className={styles.sectionTitle}>Ваши команды</h3>
          {user?.teams && user.teams.length > 0 ? (
            <table className={styles.teamsTable}>
              <thead>
                <tr>
                  <th>Имя команды</th>
                  <th>Ваша роль</th>
                </tr>
              </thead>
              <tbody>
                {user.teams.map((team, index) => (
                  <tr key={index}>
                    <td>{team.name}</td>
                    <td>{team.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className={styles.noTeams}>У вас нет команд!</p>
          )}
        </div>
      </form>
    </div>
  )
}
