/* Issue object as defined by the document */
export interface Issue {
  id: string;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  createdDate: Date;
  updatedDate: Date;
}
