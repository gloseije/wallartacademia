import {
	User,
	Role,
	RoleUser,
	Course,
	Participant,
	Lesson,
	FollowedLesson,
} from "@prisma/client";

export type {
	User,
	Role,
	RoleUser,
	Course,
	Participant,
	Lesson,
	FollowedLesson,
};

// --- Extended Types (with relations) ---

export type UserWithRoles = User & {
	roles: (RoleUser & {
		role: Role;
	})[];
};

export type CourseWithRelations = Course & {
	participants: (Participant & {
		user: User | null;
	})[];
	// Note: You might want to add instructor here if you link Course to User
};

export type LessonWithRelations = Lesson & {
	followedBy: FollowedLesson[];
};

// --- UI / Frontend Types ---

export interface CourseCardProps {
	id: number | string;
	title: string;
	instructor: string;
	price: string;
	rating: number;
	reviews: number;
	image: string;
	level: string;
	duration: string;
	category?: string;
	href?: string;
}
