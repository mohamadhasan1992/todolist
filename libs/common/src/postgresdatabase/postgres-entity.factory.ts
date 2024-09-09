export interface PostgresEntityFactory<TEntity> {
  create(...args: any): TEntity | Promise<TEntity>;
}
