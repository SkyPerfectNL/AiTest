import { User } from '@interfaces/'
import { UpdateProfileData, UpdateSettingsData } from './types'
import { apiClient } from '@api'

class UsersApi {
  async getUserProfile(userId: string): Promise<User> {
    const response = await apiClient.get<User>(`/users/${userId}/profile`)
    return response
  }

  async updateUserProfile(
    userId: string,
    data: UpdateProfileData
  ): Promise<User> {
    const response = await apiClient.patch<User>(
      `/users/${userId}/profile`,
      data
    )
    return response
  }

  async updateUserSettings(
    userId: string,
    data: UpdateSettingsData
  ): Promise<User> {
    const response = await apiClient.patch<User>(
      `/users/${userId}/settings`,
      data
    )
    return response
  }

  async deleteUser(userId: string): Promise<void> {
    await apiClient.delete(`/users/${userId}`)
  }
}

export const usersApi = new UsersApi()
export * from './types'
