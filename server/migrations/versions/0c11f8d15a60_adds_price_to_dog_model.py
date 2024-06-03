"""adds price to dog model

Revision ID: 0c11f8d15a60
Revises: de88c167e40e
Create Date: 2024-06-03 08:03:59.614984

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0c11f8d15a60'
down_revision = 'de88c167e40e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('dogs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('price', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('dogs', schema=None) as batch_op:
        batch_op.drop_column('price')

    # ### end Alembic commands ###