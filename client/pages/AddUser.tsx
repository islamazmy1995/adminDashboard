import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { addUser, getUsers, updateUser } from "@/services/api"; // <-- لازم يكونوا موجودين في api.ts

const categories = ["Web Development", "Data Science", "AI", "UI/UX"];

const UsersPage: React.FC = () => {
  // Users list
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Add User
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loadingAdd, setLoadingAdd] = useState(false);

  // Edit User
  const [editingStudent, setEditingStudent] = useState<any | null>(null);
  const [loadingEdit, setLoadingEdit] = useState(false);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Fetch users from API
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await getUsers();
      setUsers(res);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Add User
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAdd(true);
    try {
      await addUser({ name: newName, email: newEmail });
      setIsAddOpen(false);
      setNewName("");
      setNewEmail("");
      fetchUsers();
    } catch (err) {
      console.error("Failed to add user", err);
    } finally {
      setLoadingAdd(false);
    }
  };

  // Handle Update User
  const handleEditUser = async () => {
    if (!editingStudent) return;
    setLoadingEdit(true);
    try {
      await updateUser(editingStudent.id, editingStudent); // <-- لازم API عندك يدعم PUT أو PATCH
      setIsEditOpen(false);
      fetchUsers();
    } catch (err) {
      console.error("Failed to update user", err);
    } finally {
      setLoadingEdit(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Users Page</h1>

      {/* زرارين */}
      <div className="flex gap-4 justify-center mb-6">
        <Button onClick={() => setIsAddOpen(true)}>➕ Add User</Button>
        <Button
          variant="outline"
          onClick={() => {
            if (users.length > 0) {
              setEditingStudent(users[0]); // هنا اخترنا أول يوزر مثالياً
              setIsEditOpen(true);
            }
          }}
        >
          ✏️ Edit First User
        </Button>
      </div>

      {/* عرض اليوزرز */}
      {loadingUsers ? (
        <p className="text-center">Loading users...</p>
      ) : (
        <ul className="space-y-2">
          {users.map((u) => (
            <li
              key={u.id}
              className="p-3 border rounded-lg flex justify-between items-center"
            >
              <span>
                <strong>{u.name}</strong> - {u.email}
              </span>
              <Button
                size="sm"
                onClick={() => {
                  setEditingStudent(u);
                  setIsEditOpen(true);
                }}
              >
                Edit
              </Button>
            </li>
          ))}
        </ul>
      )}

      {/* Dialog Add User */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddUser} className="space-y-4">
            <Input
              type="text"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loadingAdd}>
                {loadingAdd ? "Adding..." : "Add User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog Edit User */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>

          {editingStudent && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={editingStudent.name}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={editingStudent.email}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              {/* ممكن تزود باقي الحقول بنفس الشكل */}

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditUser} disabled={loadingEdit}>
                  {loadingEdit ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Update
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
