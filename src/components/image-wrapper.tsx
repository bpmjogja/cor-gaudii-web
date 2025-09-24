import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ImageProps } from 'next/image';

export default function ImageWrapper(props: Omit<ImageProps, 'src'> & { src?: string | null }) {
	if (!props.src) {
		return <div className={cn('w-full h-full bg-gray-200 flex items-center justify-center text-gray-500', props.className)}>No Image</div>;
	}
	return (
		<Image
			{...props}
			src={'/api/file/' + props.src}
		/>
	);
}
