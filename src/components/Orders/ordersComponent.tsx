"use client";

import { OrderWithProducts } from "@/sanity/queries";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PriceFormatter from "@/components/Products/Price/priceFormatter";
import { format } from "date-fns";
import { X } from "lucide-react";
import { useState } from "react";
import OrderDetailDialog from "./orderDetailDialog";
import toast from "react-hot-toast";

const OrdersComponent = ({ orders }: { orders: OrderWithProducts[] }) => {
  const [selectedOrder, setSelectedOrder] = useState<
    OrderWithProducts | null
  >(null);
  const handleDelete = () => {
    toast.error("Delete method applied for Admin");
  };
  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((order) => (
<TableRow
              key={order?.orderNumber}
              className="cursor-pointer w-full hover:bg-gray-200 h-12"
              onClick={() => setSelectedOrder(order)}
            >
              <TableCell className="font-medium">
                <Tooltip>
                  <TooltipTrigger className="flex items-center">
                    {order.orderNumber?.slice(-10) ?? "N/A"}...
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to see order details</p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {order?.orderDate &&
                  format(new Date(order.orderDate), "dd/MM/yyyy")}
              </TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell className="hidden sm:table-cell">
                {order.email}
              </TableCell>
              <TableCell>
                <PriceFormatter
                  amount={order?.totalPrice}
                  className="text-black font-medium"
                />
              </TableCell>
              <TableCell>
                {order?.status && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order?.status.charAt(0).toUpperCase() +
                      order?.status.slice(1)}
                  </span>
                )}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {order?.invoice && (
                  <p className="font-medium line-clamp-1">
                    {order?.invoice ? order?.invoice?.number : "----"}
                  </p>
                )}
              </TableCell>
              <TableCell
                onClick={(event) => {
                  event.stopPropagation();
                  handleDelete();
                }}
                className="flex items-center justify-center group"
              >
                <X
                  size={20}
                  className="group-hover:text-shop-dark-green hoverEffect"
                />
              </TableCell>
            </TableRow>
          ))}
        </TooltipProvider>
      </TableBody>
      <OrderDetailDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrdersComponent;
