#backend/backend/schema.py

import graphene


import play_app.schema

class Mutations(
	play_app.schema.Mutation,
	graphene.ObjectType,
):
	pass


class Queries(
	play_app.schema.Query,
	graphene.ObjectType
):
	dummy = graphene.String()



schema = graphene.Schema(query=Queries, mutation=Mutations)

