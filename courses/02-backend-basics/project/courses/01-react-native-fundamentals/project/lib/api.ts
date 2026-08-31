export type ApiUser = {
  id: number;
  name: string;
  email: string;
};

export type ApiPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type WeatherResult = {
  name: string;
  temp: number;
  description: string;
  icon: string;
};

export async function fetchUsers(): Promise<ApiUser[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Failed to load users');
  return response.json();
}

export async function fetchPosts(): Promise<ApiPost[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=20');
  if (!response.ok) throw new Error('Failed to load posts');
  return response.json();
}

export async function fetchWeather(city: string): Promise<WeatherResult> {
  const query = encodeURIComponent(city.trim());
  const response = await fetch(
    `https://wttr.in/${query}?format=j1`
  );
  if (!response.ok) throw new Error('City not found');
  const data = await response.json();
  const current = data.current_condition?.[0];
  const area = data.nearest_area?.[0];
  return {
    name: area?.areaName?.[0]?.value ?? city,
    temp: Number(current?.temp_C ?? 0),
    description: current?.weatherDesc?.[0]?.value ?? 'Unknown',
    icon: current?.weatherIconUrl?.[0]?.value ?? '',
  };
}
