import { useThemeStore } from '../../store/useThemeStore';

type CircleProgressBarPropsType = {
	size: number;
	progress: number;
	trackWidth: number;
	indicatorWidth: number;
	fontsize: string;
};

export const CircleProgressBar = (props: CircleProgressBarPropsType) => {
	const { size, progress, trackWidth, indicatorWidth, fontsize } = props;
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const center = size / 2;
	const radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth);
	const dashArray = 2 * Math.PI * radius;
	const dashOffset = dashArray * ((100 - progress) / 100);

	const setProgressColor = (value: number) => {
		if (value < 30) {
			return 'var(--c-carrot)';
		}

		if (value >= 30 && value < 60) {
			return 'var(--c-yellow)';
		}

		if (value >= 60) {
			return 'var(--c-green)';
		}
	};

	return (
		<>
			<div className='relative' style={{ width: size, height: size }}>
				<svg className='rotate-[-90deg]' style={{ width: size, height: size }}>
					<circle
						cx={center}
						cy={center}
						fill='transparent'
						r={radius}
						stroke={isDarkMode ? 'var(--c-gray-5)' : 'var(--c-white)'}
						strokeWidth={trackWidth}
					/>
					<circle
						cx={center}
						cy={center}
						fill='transparent'
						r={radius}
						stroke={setProgressColor(progress)}
						strokeWidth={indicatorWidth}
						strokeDasharray={dashArray}
						strokeDashoffset={dashOffset}
						strokeLinecap='round'
					/>
				</svg>

				<div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
					<p className='rounded-full bg-c-white p-2 font-[500] dark:bg-c-gray-5 sm:p-1' style={{ fontSize: fontsize }}>
						{progress}%
					</p>
				</div>
			</div>
		</>
	);
};
