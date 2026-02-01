import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CartItem } from './CartContext';

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit' | 'wallet' | 'netbanking';
  lastFour?: string;
  brand?: string;
  name: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  orderDate: Date;
  deliveryDate?: Date;
  address: Address;
  paymentMethod: PaymentMethod;
  trackingNumber?: string;
}

interface OrderContextType {
  orders: Order[];
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  selectedAddress: Address | null;
  selectedPayment: PaymentMethod | null;
  createOrder: (items: CartItem[], total: number) => Order;
  setSelectedAddress: (address: Address) => void;
  setSelectedPayment: (payment: PaymentMethod) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  getOrderById: (id: string) => Order | undefined;
  requestReturn: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const defaultAddresses: Address[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    street: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Alex Johnson',
    street: '456 Oak Avenue',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11201',
    country: 'United States',
    isDefault: false,
  },
];

const defaultPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'credit',
    lastFour: '8376',
    brand: 'Mastercard',
    name: 'Mastercard ending in 8376',
    isDefault: true,
  },
  {
    id: '2',
    type: 'credit',
    lastFour: '6246',
    brand: 'Visa',
    name: 'Visa ending in 6246',
    isDefault: false,
  },
  {
    id: '3',
    type: 'credit',
    lastFour: '0772',
    brand: 'Visa',
    name: 'Visa ending in 0772',
    isDefault: false,
  },
];

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>(defaultAddresses);
  const [paymentMethods] = useState<PaymentMethod[]>(defaultPaymentMethods);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(defaultAddresses[0]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(defaultPaymentMethods[0]);

  const createOrder = useCallback((items: CartItem[], total: number): Order => {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      items,
      total,
      status: 'processing',
      orderDate: new Date(),
      deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      address: selectedAddress!,
      paymentMethod: selectedPayment!,
      trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    };
    setOrders(prev => [order, ...prev]);
    return order;
  }, [selectedAddress, selectedPayment]);

  const addAddress = useCallback((address: Omit<Address, 'id'>) => {
    const newAddress = { ...address, id: Date.now().toString() };
    setAddresses(prev => [...prev, newAddress]);
  }, []);

  const getOrderById = useCallback((id: string) => {
    return orders.find(o => o.id === id);
  }, [orders]);

  const requestReturn = useCallback((orderId: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: 'returned' as const } : order
      )
    );
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        addresses,
        paymentMethods,
        selectedAddress,
        selectedPayment,
        createOrder,
        setSelectedAddress,
        setSelectedPayment,
        addAddress,
        getOrderById,
        requestReturn,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
