"""Added name and username in user model

Revision ID: 5b6ea2093df2
Revises: 
Create Date: 2019-07-28 23:21:55.782546

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '5b6ea2093df2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    op.drop_table('users_addresses')
    op.drop_table('users_credentials')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users_credentials',
    sa.Column('id', postgresql.UUID(), autoincrement=False, nullable=False),
    sa.Column('user_id', postgresql.UUID(), autoincrement=False, nullable=True),
    sa.Column('email', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('password', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('phone_number', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('country_code', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('alternate_email', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('alternate_phone_number', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('alternate_country_code', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('updated_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='users_credentials_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='users_credentials_pkey')
    )
    op.create_table('users_addresses',
    sa.Column('id', postgresql.UUID(), autoincrement=False, nullable=False),
    sa.Column('user_id', postgresql.UUID(), autoincrement=False, nullable=True),
    sa.Column('house', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('street', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('city', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('state', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('country', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('updated_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='users_addresses_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='users_addresses_pkey')
    )
    op.create_table('users',
    sa.Column('id', postgresql.UUID(), autoincrement=False, nullable=False),
    sa.Column('longitude', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('latitude', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('updated_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='users_pkey')
    )
    # ### end Alembic commands ###
