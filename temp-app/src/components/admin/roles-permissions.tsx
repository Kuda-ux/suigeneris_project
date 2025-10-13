'use client';

import { useState, useEffect } from 'react';
import { Shield, Users, Settings, Eye, Edit, Trash2, Plus, Check, X } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const permissions = [
  { id: 'dashboard.view', name: 'View Dashboard', category: 'Dashboard' },
  { id: 'products.view', name: 'View Products', category: 'Products' },
  { id: 'products.create', name: 'Create Products', category: 'Products' },
  { id: 'products.edit', name: 'Edit Products', category: 'Products' },
  { id: 'products.delete', name: 'Delete Products', category: 'Products' },
  { id: 'stock.view', name: 'View Stock', category: 'Stock' },
  { id: 'stock.issue', name: 'Issue Stock', category: 'Stock' },
  { id: 'stock.receive', name: 'Receive Stock', category: 'Stock' },
  { id: 'stock.return', name: 'Process Returns', category: 'Stock' },
  { id: 'orders.view', name: 'View Orders', category: 'Orders' },
  { id: 'orders.edit', name: 'Edit Orders', category: 'Orders' },
  { id: 'orders.fulfill', name: 'Fulfill Orders', category: 'Orders' },
  { id: 'reports.view', name: 'View Reports', category: 'Reports' },
  { id: 'reports.export', name: 'Export Reports', category: 'Reports' },
  { id: 'users.view', name: 'View Users', category: 'Users' },
  { id: 'users.manage', name: 'Manage Users', category: 'Users' },
  { id: 'settings.view', name: 'View Settings', category: 'Settings' },
  { id: 'settings.edit', name: 'Edit Settings', category: 'Settings' },
];

// API functions for roles and permissions
const fetchRoles = async (): Promise<Role[]> => {
  try {
    const response = await fetch('/api/admin/roles');
    if (!response.ok) throw new Error('Failed to fetch roles');
    return await response.json();
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
};

const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('/api/admin/users');
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

const createRole = async (roleData: Omit<Role, 'id' | 'createdAt'>): Promise<Role | null> => {
  try {
    const response = await fetch('/api/admin/roles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roleData)
    });
    if (!response.ok) throw new Error('Failed to create role');
    return await response.json();
  } catch (error) {
    console.error('Error creating role:', error);
    return null;
  }
};

const updateRole = async (id: string, roleData: Partial<Role>): Promise<Role | null> => {
  try {
    const response = await fetch(`/api/admin/roles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roleData)
    });
    if (!response.ok) throw new Error('Failed to update role');
    return await response.json();
  } catch (error) {
    console.error('Error updating role:', error);
    return null;
  }
};

export function RolesPermissions() {
  const [activeTab, setActiveTab] = useState<'roles' | 'users'>('roles');
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [rolesData, usersData] = await Promise.all([
          fetchRoles(),
          fetchUsers()
        ]);
        setRoles(rolesData);
        setUsers(usersData);
        setError(null);
      } catch (err) {
        setError('Failed to load roles and users data');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getPermissionsByCategory = () => {
    const grouped: { [key: string]: typeof permissions } = {};
    permissions.forEach(permission => {
      if (!grouped[permission.category]) {
        grouped[permission.category] = [];
      }
      grouped[permission.category].push(permission);
    });
    return grouped;
  };

  const hasPermission = (rolePermissions: string[], permissionId: string) => {
    return rolePermissions.includes(permissionId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sg-black">Roles & Permissions</h2>
          <p className="text-sg-gray-600">Manage user roles and access permissions</p>
        </div>
        <button
          onClick={() => setShowRoleModal(true)}
          className="bg-sg-navy hover:bg-sg-navy/90 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Role
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-sg-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('roles')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'roles'
                ? 'border-sg-navy text-sg-navy'
                : 'border-transparent text-sg-gray-500 hover:text-sg-gray-700 hover:border-sg-gray-300'
            }`}
          >
            <Shield className="h-4 w-4 inline mr-2" />
            Roles
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-sg-navy text-sg-navy'
                : 'border-transparent text-sg-gray-500 hover:text-sg-gray-700 hover:border-sg-gray-300'
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Users
          </button>
        </nav>
      </div>

      {activeTab === 'roles' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Roles List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-sg-gray-200">
              <div className="p-4 border-b border-sg-gray-200">
                <h3 className="text-lg font-semibold text-sg-black">Roles</h3>
              </div>
              <div className="divide-y divide-sg-gray-200">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`p-4 cursor-pointer hover:bg-sg-gray-50 ${
                      selectedRole?.id === role.id ? 'bg-sg-navy/5 border-r-2 border-sg-navy' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sg-black">{role.name}</h4>
                        <p className="text-sm text-sg-gray-600">{role.description}</p>
                        <p className="text-xs text-sg-gray-500 mt-1">
                          {role.userCount} users • {role.permissions.length} permissions
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button className="text-sg-gray-400 hover:text-sg-gray-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        {role.name !== 'Admin' && (
                          <button className="text-red-400 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Permissions Detail */}
          <div className="lg:col-span-2">
            {selectedRole ? (
              <div className="bg-white rounded-lg shadow-sm border border-sg-gray-200">
                <div className="p-6 border-b border-sg-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-sg-black">{selectedRole.name} Permissions</h3>
                      <p className="text-sm text-sg-gray-600">{selectedRole.description}</p>
                    </div>
                    <button className="bg-sg-navy hover:bg-sg-navy/90 text-white px-4 py-2 rounded-lg text-sm">
                      Edit Role
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  {Object.entries(getPermissionsByCategory()).map(([category, categoryPermissions]) => (
                    <div key={category} className="mb-6">
                      <h4 className="text-sm font-semibold text-sg-black mb-3 uppercase tracking-wide">
                        {category}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {categoryPermissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-center justify-between p-3 bg-sg-gray-50 rounded-lg"
                          >
                            <span className="text-sm text-sg-gray-700">{permission.name}</span>
                            {hasPermission(selectedRole.permissions, permission.id) ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-sg-gray-200 p-12 text-center">
                <Shield className="h-12 w-12 text-sg-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-sg-gray-900 mb-2">Select a Role</h3>
                <p className="text-sg-gray-600">Choose a role from the list to view its permissions</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow-sm border border-sg-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-sg-gray-50 border-b border-sg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sg-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-sg-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-sg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-sg-black">{user.name}</div>
                        <div className="text-sm text-sg-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-sg-navy/10 text-sg-navy">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sg-gray-900">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-sg-navy hover:text-sg-navy/80">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-sg-gray-600 hover:text-sg-gray-800">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
