import { PrismaClient } from '@/generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log('Seeding database with multiple records...');

	// Buat file dummy untuk relasi
	const file = await prisma.file.create({
		data: {
			byteArray: Buffer.from('dummy'),
			mimeType: 'image/png',
		},
	});

	// Internal Users
	for (let i = 1; i <= 5; i++) {
		await prisma.internalUser.create({
			data: {
				email: `user${i}@example.com`,
				phone: `0812345678${i}`,
				password: 'hashedpassword', // ganti dengan hash bcrypt di production
				name: `Internal User ${i}`,
				role: i === 1 ? 'ADMIN' : 'MEMBER',
				bio: `Bio for user ${i}`,
				imageFileId: file.id,
			},
		});
	}

	// Guest Users
	for (let i = 1; i <= 5; i++) {
		const guestUser = await prisma.guestUser.create({
			data: {
				phone: `0898765432${i}`,
				name: `Guest User ${i}`,
			},
		});

		await prisma.user.create({
			data: {
				role: 'GUEST',
				guestId: guestUser.id,
			},
		});
	}

	// Internal User Wrapper
	const allInternal = await prisma.internalUser.findMany();
	for (const internal of allInternal) {
		await prisma.user.create({
			data: {
				role: 'INTERNAL',
				internalId: internal.id,
			},
		});
	}

	// Articles
	for (let i = 1; i <= 10; i++) {
		await prisma.article.create({
			data: {
				title: `Article ${i}`,
				content: `Content for article ${i}`,
				authorId: allInternal[0].id,
				mainImageId: file.id,
				tags: ['tag1', 'tag2'],
				categories: ['NEWS'],
				publishedAt: new Date(),
			},
		});
	}

	// Events & Attendees
	const allUsers = await prisma.user.findMany();
	for (let i = 1; i <= 3; i++) {
		const event = await prisma.event.create({
			data: {
				title: `Event ${i}`,
				startDate: new Date(),
				endDate: new Date(Date.now() + 1000 * 60 * 60 * 2),
				location: `Location ${i}`,
				description: `Description for event ${i}`,
				imageId: file.id,
				categories: ['COMMUNITY'],
				publishedAt: new Date(),
			},
		});

		for (let j = 0; j < allUsers.length; j++) {
			await prisma.eventAttendees.create({
				data: {
					eventId: event.id,
					userId: allUsers[j].id,
					additionalData: { note: `Attendee ${j} for event ${i}` },
				},
			});
		}
	}

	// Prayer Requests
	for (let i = 0; i < allUsers.length; i++) {
		await prisma.prayerRequest.create({
			data: {
				userId: allUsers[i].id,
				content: `Prayer request from user ${i}`,
			},
		});
	}

	// Consultations
	for (let i = 0; i < allInternal.length; i++) {
		await prisma.consultation.create({
			data: {
				userId: allInternal[i].id,
				date: new Date(Date.now() + 1000 * 60 * 60 * 24 * (i + 1)),
				place: `Office ${i}`,
				description: `Consultation ${i}`,
				status: 'CONFIRMED',
			},
		});
	}

	// Notifications
	for (let i = 0; i < allInternal.length; i++) {
		await prisma.notification.create({
			data: {
				userId: allInternal[i].id,
				content: `Notification for user ${i}`,
				type: 'INFO',
				clickUrl: '/dashboard',
			},
		});
	}

	// Courses & Learning Resources
	for (let i = 1; i <= 3; i++) {
		const course = await prisma.course.create({
			data: {
				title: `Course ${i}`,
				description: `Description for course ${i}`,
				imageId: file.id,
				categories: ['EDUCATIONAL'],
				publishedAt: new Date(),
				Participants: {
					connect: allInternal.map((u) => ({ id: u.id })),
				},
			},
		});

		for (let j = 1; j <= 2; j++) {
			await prisma.learningResource.create({
				data: {
					courseId: course.id,
					title: `Resource ${j} for Course ${i}`,
					description: `Description for resource ${j}`,
					fileId: file.id,
					type: 'PDF',
				},
			});
		}
	}

	// Certificates
	for (let i = 0; i < allInternal.length; i++) {
		await prisma.certificate.create({
			data: {
				holderName: allInternal[i].name,
				title: `Certificate ${i}`,
				issueDate: new Date(),
				fileId: file.id,
			},
		});
	}

	console.log('Seeding finished with bulk data ✅');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
