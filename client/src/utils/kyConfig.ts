import { UserType } from '../types/userType';
import ky from 'ky';
import { KyInstance } from 'ky/distribution/types/ky';
import { useUserStore } from '../store/useUserStore';

const prefixUrl = 'https://habits-tracker.ru/api/';

export const original: KyInstance = ky.create({ prefixUrl: prefixUrl });

export const extend: KyInstance = ky
	.create({
		prefixUrl: prefixUrl
	})
	.extend({
		hooks: {
			beforeRequest: [
				(request: Request) => {
					request.headers.set('Authorization', `Bearer ${useUserStore.getState().user?.accessToken}`);
				}
			],
			afterResponse: [
				async (request, options, response) => {
					try {
						if (response.status === 401) {
							const user: UserType = await original.get('user/refresh-session').json();

							request.headers.set('Authorization', `Bearer ${user.accessToken}`);

							return ky(request);
						}
					} catch (error) {
						useUserStore.getState().setIsAuthorized(false);
					}
				}
			]
		}
	});
