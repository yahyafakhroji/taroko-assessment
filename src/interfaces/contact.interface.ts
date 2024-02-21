export interface ContactModel {
  id: number;
  first_name: string;
  last_name: string;
  job: string;
  description: string;
}

export interface ContactListModal extends ContactModel {
  // Custom Fields
  is_favorite?: boolean;
  full_name?: string;
}
