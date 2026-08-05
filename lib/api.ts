import axios from 'axios';
import { auth } from '@clerk/nextjs/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/storefront`
  : 'http://localhost:8787/api/v1/storefront';

// Public client for browsing/cart
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Authenticated client for checkout/orders
export async function getAuthApi() {
  const { getToken } = await auth();
  const token = await getToken({ template: "crm-api" });

  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}
