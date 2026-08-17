"""AddConfiguracionTable

Revision ID: d4f8a1c7e2b9
Revises: 5afd27f3b88b
Create Date: 2026-08-17 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd4f8a1c7e2b9'
down_revision: Union[str, None] = '5afd27f3b88b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'configuracion',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('meta_domain_verification', sa.String(length=255), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_configuracion_id'), 'configuracion', ['id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_configuracion_id'), table_name='configuracion')
    op.drop_table('configuracion')
