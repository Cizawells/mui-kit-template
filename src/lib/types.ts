export interface MenuItemType {
  id: string;
  type: 'group' | 'collapse' | 'item';
  title: React.ReactNode;
  icon?: React.ComponentType<any>;
  url: string;
  caption?: string;
  target?: string;
  external?: boolean;
  disabled?: boolean;
  children?: MenuItemType[];
  chip?: any;
}
