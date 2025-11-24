"use client";

import { useEffect, useState } from "react";
import { hasPageLoaded, markPageAsLoaded } from "@/lib/page-cache";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KpiCardSkeleton, TableRowSkeleton } from "@/components/dashboard/loading-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Customer {
  id: string;
  name: string;
  plan: "free" | "pro" | "enterprise";
  mrr: number;
  ltv: number;
  lastActive: string;
  totalDocuments: number;
  totalTokens: number;
  aiCost: number;
  margin: number;
  users: number;
  status: "active" | "churned" | "at_risk";
  email: string;
  industry: string;
}

interface CustomersData {
  customers: Customer[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  summary: {
    totalCustomers: number;
    activeCustomers: number;
    atRiskCustomers: number;
    churnedCustomers: number;
    totalMrr: number;
  };
}

const planColors = {
  free: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
  pro: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  enterprise: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

const statusColors = {
  active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  churned: "bg-red-500/10 text-red-500 border-red-500/20",
  at_risk: "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

const PAGE_KEY = "customers";

export default function CustomersPage() {
  const [data, setData] = useState<CustomersData | null>(null);
  const [loading, setLoading] = useState(!hasPageLoaded(PAGE_KEY));
  const [page, setPage] = useState(1);
  const [plan, setPlan] = useState("all");
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("mrr");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const fetchData = async () => {
      // Only show full loading skeleton on initial load
      if (!hasPageLoaded(PAGE_KEY)) {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        plan,
        status,
        sortBy,
        sortOrder,
        ...(search && { search }),
      });

      const res = await fetch(`/api/admin/customers?${params}`);
      const data = await res.json();
      setData(data);
      setLoading(false);
      markPageAsLoaded(PAGE_KEY);
    };
    fetchData();
  }, [page, plan, status, search, sortBy, sortOrder]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const SortableHeader = ({
    field,
    children,
  }: {
    field: string;
    children: React.ReactNode;
  }) => (
    <TableHead
      className="cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown
          className={cn(
            "h-3.5 w-3.5 transition-colors",
            sortBy === field ? "text-foreground" : "text-muted-foreground"
          )}
        />
      </div>
    </TableHead>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="Manage and monitor your customer base"
      />

      {/* Summary Cards */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {Array.from({ length: 4 }).map((_, i) => (
            <KpiCardSkeleton key={i} index={i} />
          ))}
        </div>
      ) : data && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-primary/10 to-transparent">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{data.summary.totalCustomers}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-emerald-500/10 to-transparent">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-emerald-500">
                  {data.summary.activeCustomers}
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-amber-500/10 to-transparent">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">At Risk</p>
                <p className="text-2xl font-bold text-amber-500">
                  {data.summary.atRiskCustomers}
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-blue-500/10 to-transparent">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total MRR</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(data.summary.totalMrr)}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={plan} onValueChange={setPlan}>
                  <SelectTrigger className="w-[130px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="at_risk">At Risk</SelectItem>
                    <SelectItem value="churned">Churned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <SortableHeader field="name">Organization</SortableHeader>
                  <TableHead>Plan</TableHead>
                  <SortableHeader field="mrr">MRR</SortableHeader>
                  <SortableHeader field="users">Users</SortableHeader>
                  <SortableHeader field="lastActive">Last Active</SortableHeader>
                  <SortableHeader field="totalDocuments">Docs</SortableHeader>
                  <SortableHeader field="aiCost">AI Cost</SortableHeader>
                  <SortableHeader field="margin">Margin</SortableHeader>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 10 }).map((_, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-5 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <AnimatePresence mode="popLayout">
                    {data?.customers.map((customer, index) => (
                      <motion.tr
                        key={customer.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="group border-b transition-colors hover:bg-muted/50"
                      >
                        <TableCell>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {customer.industry}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={planColors[customer.plan]}
                          >
                            {customer.plan}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(customer.mrr)}
                        </TableCell>
                        <TableCell>{customer.users}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(customer.lastActive)}
                        </TableCell>
                        <TableCell>
                          {customer.totalDocuments.toLocaleString()}
                        </TableCell>
                        <TableCell>{formatCurrency(customer.aiCost)}</TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "font-medium",
                              customer.margin >= 50
                                ? "text-emerald-500"
                                : customer.margin >= 0
                                ? "text-amber-500"
                                : "text-red-500"
                            )}
                          >
                            {customer.margin.toFixed(1)}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={statusColors[customer.status]}
                          >
                            {customer.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/customers/${customer.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {data && (
              <div className="flex items-center justify-between border-t px-4 py-4">
                <p className="text-sm text-muted-foreground">
                  Showing {(page - 1) * 10 + 1} to{" "}
                  {Math.min(page * 10, data.pagination.total)} of{" "}
                  {data.pagination.total} results
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from(
                      { length: data.pagination.totalPages },
                      (_, i) => i + 1
                    ).map((p) => (
                      <Button
                        key={p}
                        variant={p === page ? "default" : "ghost"}
                        size="sm"
                        className="h-8 w-8"
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === data.pagination.totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
