import { ArrowRightOnRectangleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useToastStore } from '../store/useToastStore';
import { useUserStore } from '../store/useUserStore';
import { UserType } from '../types/userType';
import { extend } from '../utils/kyConfig';
import { Title } from './common/Title';
import { Button } from './ui/Button';

type NameType = {
	name: string;
};

const Name = () => {
	const setUser = useUserStore((state) => state.setUser);
	const setToast = useToastStore((state) => state.setToast);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<NameType>();

	const changeName = useMutation({
		mutationFn: async (data: NameType): Promise<UserType> => {
			return await extend.put('user/update', { json: data }).json();
		},
		onSuccess(data) {
			setUser(data);
			setToast({ type: 'success', text: 'Имя успешно изменено' });
		},
		onError() {
			setToast({ type: 'error', text: 'Не удалось обновить имя' });
		}
	});

	const onSubmit: SubmitHandler<NameType> = (data) => {
		changeName.mutate(data);
	};

	return (
		<>
			<form className='flex gap-2 xs:flex-col' onSubmit={handleSubmit(onSubmit)}>
				<input
					className={`app-input w-full ${errors.name && '!bg-c-pink'}`}
					{...register('name', { required: true })}
					placeholder='Введите новое имя'
					type='text'
					maxLength={20}
				/>
				<Button className='w-[120px] xs:w-full' isLoading={changeName.isLoading} disabled={changeName.isLoading}>
					Сохранить
				</Button>
			</form>
		</>
	);
};

type PasswordType = {
	password: string;
};

const Password = () => {
	const [isPassword, setIsPassword] = useState<boolean>(true);
	const setToast = useToastStore((state) => state.setToast);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<PasswordType>();

	const changePassword = useMutation({
		mutationFn: async (data: PasswordType): Promise<UserType> => {
			return await extend.put('user/update', { json: data }).json();
		},
		onError() {
			setToast({ type: 'error', text: 'Не удалось обновить пароль' });
		},
		onSuccess() {
			setToast({ type: 'success', text: 'Пароль успешно изменен' });
		}
	});

	const onSubmit: SubmitHandler<PasswordType> = (data) => {
		changePassword.mutate(data);
	};

	return (
		<>
			<form className='flex items-center gap-2 xs:flex-col' onSubmit={handleSubmit(onSubmit)}>
				<div className='flex w-full flex-col gap-2'>
					<div className='relative'>
						<input
							className={`app-input w-full !pr-7 ${errors.password && '!bg-c-pink'}`}
							{...register('password', { required: true })}
							placeholder='Введите новый пароль'
							type={isPassword ? 'password' : 'text'}
							autoComplete='new-password'
							minLength={6}
							maxLength={100}
						/>
						{isPassword ? (
							<EyeIcon
								className='absolute right-2 top-[14px] h-5 w-5 cursor-pointer text-c-gray-3 xs:top-[12px]'
								onClick={() => setIsPassword((state) => !state)}
							/>
						) : (
							<EyeSlashIcon
								className='absolute right-2 top-[14px] h-5 w-5 cursor-pointer text-c-gray-3 xs:top-[12px]'
								onClick={() => setIsPassword((state) => !state)}
							/>
						)}
					</div>
				</div>

				<Button
					className='w-[120px] xs:w-full'
					isLoading={changePassword.isLoading}
					disabled={changePassword.isLoading}>
					Сохранить
				</Button>
			</form>
		</>
	);
};

const SignOut = () => {
	const setIsAuthorized = useUserStore((state) => state.setIsAuthorized);
	const setToast = useToastStore((state) => state.setToast);

	const signOut = useMutation({
		mutationFn: async (): Promise<string> => {
			return await extend.get('user/sign-out').text();
		},
		onSuccess() {
			setIsAuthorized(false);
		},
		onError() {
			setToast({ type: 'error', text: 'Не удалось выйти из приложения' });
		}
	});

	return (
		<Button onClick={() => signOut.mutate()}>
			<ArrowRightOnRectangleIcon className='h-[20px] w-[20px]' />
			<span>Выйти из приложения</span>
		</Button>
	);
};

export const Settings = () => {
	return (
		<div className='flex h-full flex-col justify-between gap-6'>
			<div className='flex flex-col gap-6'>
				<Title text='Настройки' />

				<div className='flex flex-col gap-1'>
					<h2>😀 Изменить имя</h2>
					<Name />
				</div>

				<div className='flex flex-col gap-1'>
					<h2>🔑 Изменить пароль</h2>
					<Password />
				</div>
			</div>

			<SignOut />
		</div>
	);
};
