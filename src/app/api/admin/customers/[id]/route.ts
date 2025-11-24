import { NextRequest, NextResponse } from 'next/server';
import {
  customers,
  customerUsers,
  customerDocuments,
  customerTokenUsage,
  customerDocumentStats,
  customerModelUsage
} from '@/data/customers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const customer = customers.find(c => c.id === id);

  if (!customer) {
    return NextResponse.json(
      { error: 'Customer not found' },
      { status: 404 }
    );
  }

  const users = customerUsers[id] || [];
  const documents = customerDocuments[id] || [];
  const tokenUsage = customerTokenUsage[id] || customerTokenUsage['cust_001'];
  const documentStats = customerDocumentStats[id] || customerDocumentStats['cust_001'];
  const modelUsage = customerModelUsage[id] || customerModelUsage['cust_001'];

  return NextResponse.json({
    customer,
    users,
    recentDocuments: documents,
    charts: {
      tokenUsage,
      documentStats,
      modelUsage,
    },
    stats: {
      totalDocuments: customer.totalDocuments,
      totalTokens: customer.totalTokens,
      totalAiCost: customer.aiCost,
      netMargin: customer.margin,
      avgDocumentsPerDay: Math.round(customer.totalDocuments / 30),
      avgTokensPerDocument: Math.round(customer.totalTokens / customer.totalDocuments),
    },
  });
}
