"""add tiene_promo to plan

Revision ID: b2c3d4e5f6a1
Revises: a1b2c3d4e5f6
Create Date: 2026-07-27 17:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b2c3d4e5f6a1'
down_revision: Union[str, None] = 'a1b2c3d4e5f6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('planes', sa.Column('tiene_promo', sa.Boolean(), server_default='false', nullable=True))
    
    # Auto-activate for existing plans that have promo price less than regular price
    op.execute("UPDATE planes SET tiene_promo = true WHERE precio_promo IS NOT NULL AND precio_promo < precio_regular")
    op.execute("UPDATE planes SET tiene_promo = false WHERE tiene_promo IS NULL")


def downgrade() -> None:
    op.drop_column('planes', 'tiene_promo')
