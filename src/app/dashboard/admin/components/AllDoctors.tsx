import DialogComp from "@/components/DialogComp";
import AddTherapistForm from "@/components/forms/AddTherapistForm";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { SquarePenIcon } from "@/components/icons/EditIcon";
import { Button } from "@/components/ui/button";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import ApiService from "@/helper/ApiService";
import useTherapistStore,{useTherapist} from "@/store/Therapist";
import { memo, useCallback, useEffect, useState } from "react";

const apiService = new ApiService("/api/therapist");

function AllTherapistTable() {
	const { setAllItems } = useTherapistStore();
	const getAllUsers = useTherapistStore((state) => state.getAllUsers);
	const removeItem = useTherapistStore((state) => state.removeItem);
	const hydrated = useTherapistStore((state) => state.hydrated);
	// const [users, setUsers] = useState<Therapists[]>(getAllUsers());
	useEffect(() => {
		if (!hydrated) {
			const getData = async () => {
				const res = await apiService.get<Therapists[]>({});
				if (res.data) {
					setAllItems(res.data);
					// setUsers(res.data);
				}
			};
			getData();
		}
	}, [hydrated, setAllItems]);

	// useEffect(() => {
	// 	setUsers(getAllUsers());
	// }, [getAllUsers]);
	const Rows = memo(({ data }: { data: Therapists }) => {
		const remove = useCallback(
			async (id: string) => {
				const res = await apiService.delete({
					endpoint: `?id=${id}`,
				});
				if (res.success) {
					removeItem(id);
					// setUsers(getAllUsers());
				}
			},
			[removeItem]
		);

		return (
			<TableRow key={data._id}>
				<TableCell className="font-medium">{data.name}</TableCell>
				<TableCell>{data.email}</TableCell>
				<TableCell>{data.speciality}</TableCell>
				<TableCell>{data.contactNo}</TableCell>
				<TableCell className="text-right">
					<div className="flex items-center">
						<DialogComp
							content={<AddTherapistForm defaultValues={data} />}
							title="Edit Therapist"
						>
							<Button className="ml-2" variant="outline" size={"icon"}>
								<SquarePenIcon />
							</Button>
						</DialogComp>
						<Button
							className="ml-2"
							variant="destructive"
							size={"icon"}
							onClick={() => remove(data._id)}
						>
							<DeleteIcon />
						</Button>
					</div>
				</TableCell>
			</TableRow>
		);
	});

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Speciality</TableHead>
					<TableHead>Contact No</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{getAllUsers().map((data) => (
					<Rows key={data._id} data={data} />
				))}
			</TableBody>
		</Table>
	);
}

export default memo(AllTherapistTable);