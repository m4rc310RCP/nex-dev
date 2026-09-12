import NodeCache from "node-cache";

export interface ICacheUser {
	nr_cpfcnpj: string,
	nm_pessoa: string,
	dt_acesso: Date
}

// TTL = 300 segundos (5 minutos)
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

const KEY_HASH_USERS = "user-hash-key";
export const userCacheValidate = {
  putHash(hash: string) {
    cache.set(KEY_HASH_USERS, hash);
  },
  hasChangedListUser(hash: string): boolean {
    return cache.get(KEY_HASH_USERS) === hash;
  },
};

export const userCacheService = {
  addUser(user: ICacheUser) {
    if (!cache.has(user.nr_cpfcnpj)) {
      // ws.notifyUsersOnline({
      //   nr_cpfcnpj: user.nr_cpfclient,
      //   dt_connection: user.lastAccess,
      // });
    }

    cache.set(user.nr_cpfcnpj, user);
  },

  getUsers(): ICacheUser[] {
    return cache.keys().map((key) => cache.get<ICacheUser>(key)!);
  },

  getUser(id: string): ICacheUser | undefined {
    return cache.get<ICacheUser>(id);
  },

  removeUser(id: string) {
    cache.del(id);
  },
};