export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

// Fallback data in case API fails
const fallbackUsers: User[] = [
  {
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg"
  },
  {
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg"
  },
  {
    id: 3,
    email: "emma.wong@reqres.in",
    first_name: "Emma",
    last_name: "Wong",
    avatar: "https://reqres.in/img/faces/3-image.jpg"
  }
];

export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch('https://reqres.in/api/users?per_page=3');
    
    if (!response.ok) {
      console.warn(`API request failed with status ${response.status}, using fallback data`);
      return fallbackUsers;
    }
    
    const data: ApiResponse = await response.json();
    
    // Check if data and data.data exist before mapping
    if (!data || !data.data || !Array.isArray(data.data)) {
      console.error('Invalid API response format, using fallback data:', data);
      return fallbackUsers;
    }
    
    // If the API returns an empty array, use fallback data
    if (data.data.length === 0) {
      console.warn('API returned empty data, using fallback data');
      return fallbackUsers;
    }
    
    return data.data.map(user => ({
      ...user,
      // Format the user's name to be more readable
      first_name: user.first_name?.charAt(0).toUpperCase() + user.first_name?.slice(1) || '',
      last_name: user.last_name?.charAt(0).toUpperCase() + user.last_name?.slice(1) || '',
    }));
  } catch (error) {
    console.error('Error fetching users, using fallback data:', error);
    return fallbackUsers;
  }
}

// For an actual implementation, we would have more methods like:
// export async function createUser(userData: Partial<User>): Promise<User> { ... }
// export async function updateUser(id: number, userData: Partial<User>): Promise<User> { ... }
// export async function deleteUser(id: number): Promise<boolean> { ... } 