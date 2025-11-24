import { NextRequest, NextResponse } from 'next/server';
import { customers } from '@/data/customers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const plan = searchParams.get('plan');
  const status = searchParams.get('status');
  const sortBy = searchParams.get('sortBy') || 'mrr';
  const sortOrder = searchParams.get('sortOrder') || 'desc';
  const search = searchParams.get('search');

  let filteredCustomers = [...customers];

  // Apply filters
  if (plan && plan !== 'all') {
    filteredCustomers = filteredCustomers.filter(c => c.plan === plan);
  }
  if (status && status !== 'all') {
    filteredCustomers = filteredCustomers.filter(c => c.status === status);
  }
  if (search) {
    const searchLower = search.toLowerCase();
    filteredCustomers = filteredCustomers.filter(c =>
      c.name.toLowerCase().includes(searchLower) ||
      c.email.toLowerCase().includes(searchLower) ||
      c.industry.toLowerCase().includes(searchLower)
    );
  }

  // Apply sorting
  filteredCustomers.sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a];
    const bValue = b[sortBy as keyof typeof b];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    }
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'desc'
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    }
    return 0;
  });

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  return NextResponse.json({
    customers: paginatedCustomers,
    pagination: {
      page,
      limit,
      total: filteredCustomers.length,
      totalPages: Math.ceil(filteredCustomers.length / limit),
    },
    summary: {
      totalCustomers: customers.length,
      activeCustomers: customers.filter(c => c.status === 'active').length,
      atRiskCustomers: customers.filter(c => c.status === 'at_risk').length,
      churnedCustomers: customers.filter(c => c.status === 'churned').length,
      totalMrr: customers.reduce((sum, c) => sum + c.mrr, 0),
    },
  });
}
