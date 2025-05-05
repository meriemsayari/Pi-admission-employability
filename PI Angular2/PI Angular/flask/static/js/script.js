// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const predictionForm = document.getElementById('prediction-form');
    if (predictionForm) {
        predictionForm.addEventListener('submit', function(e) {
            const idConcours = document.getElementById('id_concours').value;
            const moyBacEt = document.getElementById('moy_bac_et').value;
            const resultat = document.getElementById('resultat').value;
            
            // Basic validation
            if (!idConcours || !moyBacEt || !resultat) {
                e.preventDefault();
                alert('Veuillez remplir tous les champs requis.');
                return false;
            }
            
            // Range validation for moyenne bac
            if (moyBacEt < 0 || moyBacEt > 20) {
                e.preventDefault();
                alert('La moyenne du bac doit être comprise entre 0 et 20.');
                return false;
            }
            
            return true;
        });
    }
    
    // Save result functionality
    const saveResultButton = document.getElementById('save-result');
    if (saveResultButton) {
        saveResultButton.addEventListener('click', function() {
            // Get the prediction value from the page
            const predictionValue = document.querySelector('.score-value').textContent;
            
            // Get input data
            const idConcours = document.querySelector('.detail-item:nth-child(1) .detail-value').textContent;
            const moyBacEt = document.querySelector('.detail-item:nth-child(2) .detail-value').textContent;
            const resultat = document.querySelector('.detail-item:nth-child(3) .detail-value').textContent;
            
            // Create prediction object
            const prediction = {
                id_concours: idConcours,
                moy_bac_et: moyBacEt,
                resultat: resultat,
                prediction: predictionValue,
                date: new Date().toISOString()
            };
            
            // Get existing predictions from localStorage or initialize empty array
            let savedPredictions = JSON.parse(localStorage.getItem('predictions') || '[]');
            
            // Add new prediction
            savedPredictions.push(prediction);
            
            // Save to localStorage
            localStorage.setItem('predictions', JSON.stringify(savedPredictions));
            
            // Show confirmation
            alert('Prédiction sauvegardée avec succès!');
        });
    }
    
    // Display saved predictions on history page
    const historyContainer = document.getElementById('predictions-history');
    if (historyContainer) {
        const savedPredictions = JSON.parse(localStorage.getItem('predictions') || '[]');
        
        if (savedPredictions.length === 0) {
            historyContainer.innerHTML = '<div class="empty-state"><i class="fas fa-history"></i><p>Aucune prédiction sauvegardée</p></div>';
        } else {
            // Sort predictions by date (newest first)
            savedPredictions.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            let historyHTML = '';
            savedPredictions.forEach((item, index) => {
                const date = new Date(item.date).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                let scoreClass = '';
                if (parseFloat(item.prediction) >= 15) scoreClass = 'excellent';
                else if (parseFloat(item.prediction) >= 12) scoreClass = 'good';
                else if (parseFloat(item.prediction) >= 10) scoreClass = 'average';
                else scoreClass = 'below-average';
                
                historyHTML += `
                <div class="history-item">
                    <div class="history-score ${scoreClass}">
                        ${parseFloat(item.prediction).toFixed(2)}
                    </div>
                    <div class="history-details">
                        <div class="history-date">${date}</div>
                        <div class="history-params">
                            <span>ID: ${item.id_concours}</span>
                            <span>Bac: ${item.moy_bac_et}</span>
                            <span>Résultat: ${item.resultat}</span>
                        </div>
                    </div>
                    <div class="history-actions">
                        <button class="btn-delete" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                `;
            });
            
            historyContainer.innerHTML = historyHTML;
            
            // Add event listeners to delete buttons
            document.querySelectorAll('.btn-delete').forEach(button => {
                button.addEventListener('click', function() {
                    const index = this.getAttribute('data-index');
                    savedPredictions.splice(index, 1);
                    localStorage.setItem('predictions', JSON.stringify(savedPredictions));
                    // Reload the page to update the list
                    location.reload();
                });
            });
        }
    }
    
    // Animation for cards
    const cards = document.querySelectorAll('.info-card, .result-card, .recommendation-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
// Add this to your script.js file

document.addEventListener('DOMContentLoaded', function() {
    // Style resultat badges based on their content
    const resultatBadges = document.querySelectorAll('.resultat-badge');
    
    resultatBadges.forEach(badge => {
        const text = badge.textContent.trim();
        
        if (text === 'ADMIS(E)') {
            badge.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
            badge.style.color = '#28a745';
        } else if (text === 'REFUSE(E)') {
            badge.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
            badge.style.color = '#dc3545';
        } else if (text === 'LISTE ATTENTE') {
            badge.style.backgroundColor = 'rgba(255, 193, 7, 0.1)';
            badge.style.color = '#ffc107';
        }
    });
    
    // Apply the same styling to the select dropdown options
    const resultatSelect = document.getElementById('resultat');
    if (resultatSelect) {
        resultatSelect.addEventListener('change', function() {
            // Reset background
            this.style.backgroundColor = '';
            this.style.color = '';
            
            const selectedValue = this.value;
            
            if (selectedValue === 'ADMIS(E)') {
                this.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
                this.style.color = '#28a745';
            } else if (selectedValue === 'REFUSE(E)') {
                this.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
                this.style.color = '#dc3545';
            } else if (selectedValue === 'LISTE ATTENTE') {
                this.style.backgroundColor = 'rgba(255, 193, 7, 0.1)';
                this.style.color = '#ffc107';
            }
        });
    }
});