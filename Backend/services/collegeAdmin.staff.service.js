import { staff } from "../config/schema.js";

export class StaffService {

    static async addStaff({ name, email, designation, collegeId, password }) {

        try {
            const [newStaff] = await db.insert(staff).values({ name, email, designation, collegeId, password }).returning();
            return newStaff + console.log(newStaff);
        } catch (error) {
            console.log(error);
        }

    };

    // Get the staff
    static async getStaff(collegeId) {
        return await db.select().from(staff).where(eq(staff.collegeId, collegeId));
    };

    // Update the staff
    static async updatedStaff(staffId, { name, email, designation }, collegeId) {

        const [updated] = await db.update(staff)
            .set({ name, email, designation })
            .where(eq(staff.id, staffId))
            .where(eq(staff.collegeId, collegeId))
            .returning();
        return updated;

    };

    // Delete the Staff
    static async deleteStaff(staffId, collegeId) {
        return await db.delete(staff).where(eq(staff.id, staffId)).where(eq(staff.collegeId, collegeId)).returning();
    }
}