import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { serverAPi } from "@/utils/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Eye, EyeOff } from "lucide-react";
import { TenantTable } from "@/components/tenant-table";

export default function TenantPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [tenants, setTenants] = useState([]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            status: "Active",
        },
    });

    const onSubmit = async (data) => {
        try {
            const res = await serverAPi.post("/api/tenant/create-tenant", data);
            const result = res.data;

            if (result.status === 1) {
                toast.success(result.message);
                setIsDialogOpen(false);
                reset();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const fetchTenants = async () => {
        try {
            const object = {
                limit: 5,
                page: 0,
                search: ""
            }
            const res = await serverAPi.post("/api/tenant/get-tenants", object);
            const result = res.data;
            if (result.status === 1) {
                toast.success(result.message);
                setTenants(result.data);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        fetchTenants()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Tenant Management</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 w-4 h-4" />
                            Add Tenant
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Add New Tenant</DialogTitle>
                            <DialogDescription>
                                Fill in tenant details below.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Company Name */}
                                <div className="space-y-2">
                                    <Label>Company Name</Label>
                                    <Input {...register("companyName", { required: "Company name is required" })} />
                                    {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
                                </div>

                                {/* Unique DB Name */}
                                <div className="space-y-2">
                                    <Label>Unique Name</Label>
                                    <Input {...register("dbName", { required: "Unique name is required" })} />
                                    {errors.dbName && <p className="text-red-500 text-sm">{errors.dbName.message}</p>}
                                </div>

                                {/* Contact Person */}
                                <div className="space-y-2">
                                    <Label>Contact Person</Label>
                                    <Input {...register("contactPerson", { required: "Contact person is required" })} />
                                    {errors.contactPerson && <p className="text-red-500 text-sm">{errors.contactPerson.message}</p>}
                                </div>

                                {/* Contact Number */}
                                <div className="space-y-2">
                                    <Label>Contact Number</Label>
                                    <Input {...register("contactNumber", { required: "Contact number is required" })} />
                                    {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label>Email Address</Label>
                                    <Input type="email" {...register("email", { required: "Email is required" })} />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>

                                {/* Password */}
                                <div className="space-y-2 relative">
                                    <Label>Password</Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: { value: 6, message: "Password must be at least 6 characters" },
                                            })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                </div>

                                {/* Expiry Date */}
                                <div className="space-y-2">
                                    <Label>Subscription Expiry Date</Label>
                                    <Input type="date" {...register("subscriptionExpDate", { required: "Expiry date is required" })} />
                                    {errors.subscriptionExpDate && <p className="text-red-500 text-sm">{errors.subscriptionExpDate.message}</p>}
                                </div>

                                {/* Address */}
                                <div className="space-y-2">
                                    <Label>Address</Label>
                                    <Input {...register("address", { required: "Address is required" })} />
                                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                                </div>

                                {/* Description */}
                                <div className="space-y-2 col-span-2">
                                    <Label>Description</Label>
                                    <Input {...register("description")} />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsDialogOpen(false);
                                        reset();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">Add Tenant</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <TenantTable
                tenants={tenants}
                onEdit={(emp) => console.log("Edit:", emp)}
                onDelete={(id) => console.log("Delete:", id)}
            />
        </div>
    );
}
