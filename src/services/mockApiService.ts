import { User } from '@interfaces/'
import { MOCK_CODE } from '@constants/'
import { MOCK_PASSWORD, mockTokens, mockUsers } from '../mock/mockData'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

class MockApiService {
  private currentUser: User | null = null

  async login(credentials: { email: string; password: string }) {
    await delay(1000)

    const user = mockUsers.find(
      (u) =>
        u.profileData.email === credentials.email &&
        credentials.password === MOCK_PASSWORD
    )

    if (!user) {
      throw new Error('Invalid email or password')
    }

    this.currentUser = user

    return {
      user,
      accessToken: mockTokens.accessToken,
      refreshToken: mockTokens.refreshToken,
    }
  }

  async register(data: { username: string; email: string; password: string }) {
    await delay(1000)

    const userExists = mockUsers.some((u) => u.profileData.email === data.email)
    if (userExists) {
      throw new Error('User already exists')
    }

    const newUser: User = {
      ...mockUsers[1],
      id: Date.now().toString(),
      profileData: {
        ...mockUsers[1].profileData,
        username: data.username,
        email: data.email,
        emailConfirmed: false,
      },
    }

    this.currentUser = newUser

    return {
      user: newUser,
      accessToken: mockTokens.accessToken,
      refreshToken: mockTokens.refreshToken,
    }
  }

  async getCurrentUser() {
    await delay(500)

    if (!this.currentUser) {
      throw new Error('Not authenticated')
    }

    return this.currentUser
  }

  async confirmEmail(data: { email: string; code: string }) {
    await delay(800)

    if (data.code !== MOCK_CODE) {
      throw new Error('Invalid confirmation code')
    }

    if (this.currentUser) {
      this.currentUser = {
        ...this.currentUser,
        profileData: {
          ...this.currentUser.profileData,
          emailConfirmed: true,
        },
      }
    }

    return { success: true }
  }

  async confirmPhone(data: { phone: string; code: string }) {
    await delay(800)

    if (data.code !== MOCK_CODE) {
      throw new Error('Invalid confirmation code')
    }

    if (this.currentUser) {
      this.currentUser = {
        ...this.currentUser,
        profileData: {
          ...this.currentUser.profileData,
          phoneConfirmed: true,
        },
      }
    }

    return { success: true }
  }

  async getUserProfile(userId: string) {
    await delay(600)

    const user = mockUsers.find((u) => u.id === userId)
    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  async updateUserProfile(
    userId: string,
    profileData: Partial<User['profileData']>
  ) {
    await delay(800)

    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser = {
        ...this.currentUser,
        profileData: {
          ...this.currentUser.profileData,
          ...profileData,
        },
      }
    }

    return this.currentUser!
  }

  async updateUserSettings(
    userId: string,
    settingsData: Partial<User['settingsData']>
  ) {
    await delay(800)

    if (this.currentUser && this.currentUser.id === userId) {
      this.currentUser = {
        ...this.currentUser,
        settingsData: {
          ...this.currentUser.settingsData,
          ...settingsData,
        },
      }
    }

    return this.currentUser!
  }
}

export const mockApiService = new MockApiService()
