"""test

Revision ID: fbe06dc34207
Revises: bdab218094be
Create Date: 2024-06-19 12:14:05.893157

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fbe06dc34207'
down_revision = 'bdab218094be'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('appointments', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.DATETIME(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('appointments', schema=None) as batch_op:
        batch_op.alter_column('date',
               existing_type=sa.DATETIME(),
               nullable=False)

    # ### end Alembic commands ###
